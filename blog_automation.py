#!/usr/bin/env python3
"""
DFW Homes & Loans — Blog Automation Pipeline
Tony Botchev, NMLS #114198 | Sponsored by Loan Factory, Inc. NMLS #320841

Runs on Tuesday + Friday at 9:00 AM CT via Manus scheduled task.
Generates AEO-optimized article → saves Markdown + PDF → commits to GitHub → POSTs to GHL webhook.

M8 UPDATE: AEO-first prompt structure — every H2 leads with a definitive answer.
"""

import os
import json
import subprocess
import requests
from datetime import datetime
from anthropic import Anthropic

# ─── CONFIG ───────────────────────────────────────────────────────────────────

GITHUB_REPO = "tonybotchev/dfwhome-loans-2026"
BLOGDATA_PATH = "client/src/lib/blogData.ts"
DRIVE_FOLDER = "friday-content-{date}"
GHL_WEBHOOK_URL = os.environ.get("GHL_WEBHOOK_URL", "")  # Set in env when M1 is complete

# Topic queue — ordered. Each run pops the next PENDING topic.
TOPIC_QUEUE = [
    {
        "id": "fha-vs-conventional-loan-dfw-2026",
        "slug": "fha-vs-conventional-loan-dfw-2026",
        "title": "FHA vs Conventional Loans in DFW: Which Is Right for You in 2026?",
        "category": "Loan Types",
        "status": "PENDING",
        "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80",
    },
    {
        "id": "down-payment-assistance-texas-2026",
        "slug": "down-payment-assistance-texas-2026",
        "title": "Down Payment Assistance Programs in Texas: 2026 Complete Guide",
        "category": "First-Time Buyers",
        "status": "PENDING",
        "image": "https://images.unsplash.com/photo-1582407947304-fd86f28f8e7b?w=1200&q=80",
    },
    {
        "id": "dfw-housing-market-outlook-2026",
        "slug": "dfw-housing-market-outlook-2026",
        "title": "DFW Housing Market Outlook 2026: What Buyers Need to Know",
        "category": "Market Insights",
        "status": "PENDING",
        "image": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
    },
    {
        "id": "va-loan-benefits-dfw-veterans-2026",
        "slug": "va-loan-benefits-dfw-veterans-2026",
        "title": "VA Loan Benefits for DFW Veterans: 2026 Guide",
        "category": "VA Loans",
        "status": "PENDING",
        "image": "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&q=80",
    },
    {
        "id": "mortgage-pre-approval-checklist-dfw",
        "slug": "mortgage-pre-approval-checklist-dfw",
        "title": "Mortgage Pre-Approval Checklist for DFW Home Buyers (2026)",
        "category": "Process",
        "status": "PENDING",
        "image": "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&q=80",
    },
    {
        "id": "refinancing-your-dfw-home-2026",
        "slug": "refinancing-your-dfw-home-2026",
        "title": "When to Refinance Your DFW Home in 2026",
        "category": "Refinance",
        "status": "PENDING",
        "image": "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
    },
    {
        "id": "best-neighborhoods-dfw-first-time-buyers",
        "slug": "best-neighborhoods-dfw-first-time-buyers",
        "title": "Best North DFW Neighborhoods for First-Time Buyers in 2026",
        "category": "Market Insights",
        "status": "PENDING",
        "image": "https://images.unsplash.com/photo-1592595896616-c37162298647?w=1200&q=80",
    },
]

# ─── AEO-OPTIMIZED PROMPT TEMPLATE (M8) ──────────────────────────────────────

def build_aeo_prompt(topic: dict) -> str:
    """
    M8: AEO-first prompt structure.
    Every H2 leads with a definitive answer (not a vague topic heading).
    AI search engines (Perplexity, ChatGPT, Gemini) preferentially cite
    content with direct, factual answers at the top of each section.
    """
    return f"""You are Tony Botchev, a Texas-licensed Mortgage Loan Originator (NMLS #114198), 
writing a blog post for dfwhome.loans. You serve North DFW buyers in Celina, Prosper, Frisco, 
McKinney, Allen, Plano, Aubrey, Anna, Melissa, and surrounding communities.
Sponsored by Loan Factory, Inc. NMLS #320841.

Write a comprehensive, AEO-optimized blog article on:
TITLE: {topic['title']}
SLUG: {topic['slug']}
CATEGORY: {topic['category']}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AEO STRUCTURE RULES (MANDATORY):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WRONG (vague topic heading):
## Understanding Credit Scores

RIGHT (definitive answer as heading):
## Your FHA loan minimum credit score in Texas in 2026 is 580 with a 3.5% down payment, or 500–579 with 10% down.

Every H2 MUST:
1. State the definitive answer or key fact FIRST in the heading itself
2. Open the section with a 1-sentence direct answer (not a question, not a vague intro)
3. Then expand with context, nuance, and DFW-specific details

This structure makes the content directly citable by AI search engines.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ARTICLE REQUIREMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

FORMAT: HTML (not Markdown) — the article will be injected into a React component.

STRUCTURE:
- Opening paragraph (2-3 sentences, hook + DFW context, no H2 yet)
- 4-6 H2 sections, each with AEO-first heading + 2-3 paragraphs
- Mid-article CTA block (after section 2-3):
  <div class="article-cta">
    <p>Ready to explore your options? <a href="/apply">Get pre-qualified in 3 minutes →</a></p>
    <p>Or call NOVA directly: <a href="tel:+19452945020">(945) 294-5020</a></p>
  </div>
- FAQ section (4-6 Q&A pairs, AEO-optimized — definitive answers, 2-4 sentences each)
- Closing paragraph with soft CTA to /apply

LENGTH: 900–1,200 words of body text

TONE: Professional but approachable. First-person ("I help buyers..."). North DFW specific.

COMPLIANCE (MANDATORY):
- No specific interest rate promises (e.g., do NOT say "rates are 6.5%")
- No "guaranteed approval" language
- Include at minimum: "Tony Botchev, NMLS #114198" and "Loan Factory, Inc. NMLS #320841"
- Include Equal Housing Lender mention once
- TCPA-compliant language on any contact references

DFW CONTEXT: Reference specific North DFW cities (Celina, Prosper, Frisco, McKinney, Allen, 
Plano, Aubrey, Anna, Melissa) where relevant. Use 2026 data where possible.

OUTPUT FORMAT:
Return a JSON object with these exact keys:
{{
  "title": "...",
  "slug": "...",
  "excerpt": "...(150-160 chars, SEO-optimized meta description)...",
  "seoTitle": "...(60 chars max, include NMLS #114198 or DFW)...",
  "seoDescription": "...(155 chars max)...",
  "category": "...",
  "readTime": "X min read",
  "content": "...(full HTML article body)...",
  "faq": [
    {{"q": "...", "a": "..."}},
    {{"q": "...", "a": "..."}},
    {{"q": "...", "a": "..."}},
    {{"q": "...", "a": "..."}},
    {{"q": "...", "a": "..."}}
  ],
  "fbCaption": "...(Facebook post caption, 2-3 sentences, emoji OK, include link placeholder [LINK] and #DFWMortgage #NorthDFW #TonyBotchev #NMLS114198)..."
}}

Return ONLY the JSON object. No markdown fences. No explanation."""


# ─── PIPELINE FUNCTIONS ───────────────────────────────────────────────────────

def get_next_pending_topic() -> dict | None:
    """Returns the next PENDING topic from the queue."""
    for topic in TOPIC_QUEUE:
        if topic["status"] == "PENDING":
            return topic
    return None


def generate_article(topic: dict) -> dict:
    """Calls Claude API with AEO-optimized prompt to generate the article."""
    client = Anthropic()
    prompt = build_aeo_prompt(topic)
    
    print(f"Generating article for: {topic['title']}")
    
    message = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=4096,
        messages=[{"role": "user", "content": prompt}]
    )
    
    raw = message.content[0].text.strip()
    
    # Strip markdown fences if present
    if raw.startswith("```"):
        lines = raw.split('\n')
        raw = '\n'.join(lines[1:-1] if lines[-1].strip() == '```' else lines[1:])
    
    article = json.loads(raw)
    return article


def save_markdown(topic: dict, article: dict) -> str:
    """Saves article as Markdown file for Drive upload."""
    date_str = datetime.now().strftime("%Y-%m-%d")
    filename = f"/home/ubuntu/{topic['slug']}-{date_str}.md"
    
    md = f"""# {article['title']}
*By Tony Botchev, NMLS #114198 | {datetime.now().strftime('%B %d, %Y')} | {article['readTime']}*

{article['excerpt']}

---

{article['content']}

---

## Frequently Asked Questions

"""
    for faq in article.get('faq', []):
        md += f"**{faq['q']}**\n\n{faq['a']}\n\n"
    
    md += f"""---

*Tony Botchev, NMLS #114198 | Loan Factory, Inc. NMLS #320841 | Equal Housing Lender*
*DFW Homes & Loans | dfwhome.loans | (945) 294-5020*
"""
    
    with open(filename, 'w') as f:
        f.write(md)
    
    print(f"Saved Markdown: {filename}")
    return filename


def save_pdf(md_path: str, topic: dict) -> str:
    """Converts Markdown to PDF using manus-md-to-pdf."""
    date_str = datetime.now().strftime("%Y-%m-%d")
    pdf_path = f"/home/ubuntu/friday-content-{date_str}.pdf"
    result = subprocess.run(["manus-md-to-pdf", md_path, pdf_path], capture_output=True)
    if result.returncode == 0:
        print(f"Saved PDF: {pdf_path}")
    else:
        print(f"PDF generation warning: {result.stderr.decode()}")
    return pdf_path


def upload_to_drive(pdf_path: str) -> bool:
    """Uploads PDF to Google Drive friday-content folder."""
    date_str = datetime.now().strftime("%Y-%m-%d")
    drive_path = f"manus_google_drive:friday-content-{date_str}.pdf"
    result = subprocess.run(
        ["rclone", "copyto", pdf_path, drive_path, "--config", "/home/ubuntu/.gdrive-rclone.ini"],
        capture_output=True
    )
    if result.returncode == 0:
        print(f"Uploaded to Drive: {drive_path}")
        return True
    else:
        print(f"Drive upload failed: {result.stderr.decode()}")
        return False


def build_blogdata_entry(topic: dict, article: dict) -> str:
    """Builds the TypeScript blogData.ts entry for the new article."""
    date_str = datetime.now().strftime("%Y-%m-%d")
    
    entry = f"""  {{
    id: "{topic['slug']}",
    slug: "{topic['slug']}",
    title: "{article['title'].replace('"', '\\"')}",
    excerpt: "{article['excerpt'].replace('"', '\\"')}",
    seoTitle: "{article.get('seoTitle', article['title']).replace('"', '\\"')}",
    seoDescription: "{article.get('seoDescription', article['excerpt']).replace('"', '\\"')}",
    category: "{article['category']}",
    readTime: "{article['readTime']}",
    date: "{date_str}",
    image: "{topic['image']}",
    content: `{article['content'].replace('`', '\\`')}`,
    faq: {json.dumps(article.get('faq', []), indent=6)},
    schema: {{
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "{article['title'].replace('"', '\\"')}",
      datePublished: "{date_str}",
      dateModified: "{date_str}",
      author: {{
        "@type": "Person",
        "@id": "https://www.dfwhome.loans/#tony",
        name: "Tony Botchev",
        identifier: {{ "@type": "PropertyValue", name: "NMLS", value: "114198" }},
      }},
      publisher: {{
        "@type": "Organization",
        "@id": "https://www.dfwhome.loans/#business",
        name: "DFW Homes & Loans",
        logo: {{ "@type": "ImageObject", url: "https://www.dfwhome.loans/logo.png" }},
      }},
      description: "{article.get('seoDescription', article['excerpt']).replace('"', '\\"')}",
      url: "https://www.dfwhome.loans/blog/{topic['slug']}",
      mainEntityOfPage: "https://www.dfwhome.loans/blog/{topic['slug']}",
      image: "{topic['image']}",
    }},
  }},"""
    
    return entry


def commit_to_github(topic: dict, article: dict, entry: str) -> bool:
    """Prepends new article entry to blogData.ts and commits to GitHub."""
    repo_path = "/home/ubuntu/dfwhome-loans-2026"
    blogdata_path = f"{repo_path}/{BLOGDATA_PATH}"
    
    try:
        with open(blogdata_path, 'r') as f:
            content = f.read()
        
        # Insert new entry after "export const blogPosts: BlogPost[] = ["
        insert_marker = "export const blogPosts: BlogPost[] = ["
        if insert_marker in content:
            content = content.replace(
                insert_marker,
                f"{insert_marker}\n{entry}"
            )
            with open(blogdata_path, 'w') as f:
                f.write(content)
        
        # Git commit and push
        os.chdir(repo_path)
        subprocess.run(["git", "add", BLOGDATA_PATH], check=True)
        subprocess.run([
            "git", "commit", "-m",
            f"blog: add {topic['slug']} ({datetime.now().strftime('%Y-%m-%d')})"
        ], check=True)
        subprocess.run(["git", "push", "origin", "main"], check=True)
        
        print(f"Committed to GitHub: {topic['slug']}")
        return True
    except Exception as e:
        print(f"GitHub commit failed: {e}")
        return False


def post_to_facebook_via_ghl(topic: dict, article: dict) -> bool:
    """POSTs to GHL webhook to trigger Social Planner Facebook post."""
    if not GHL_WEBHOOK_URL:
        print("GHL_WEBHOOK_URL not set — skipping Facebook post (M1 blocker)")
        return False
    
    date_str = datetime.now().strftime("%B %d, %Y")
    article_url = f"https://www.dfwhome.loans/blog/{topic['slug']}"
    
    caption = article.get('fbCaption', '').replace('[LINK]', article_url)
    if not caption:
        caption = (
            f"📝 New article: {article['title']}\n\n"
            f"{article['excerpt']}\n\n"
            f"Read the full guide → {article_url}\n\n"
            f"#DFWMortgage #NorthDFW #TonyBotchev #NMLS114198"
        )
    
    payload = {
        "article_title": article['title'],
        "article_url": article_url,
        "article_excerpt": article['excerpt'],
        "fb_caption": caption,
        "date": date_str,
        "slug": topic['slug'],
        "category": article['category'],
    }
    
    try:
        resp = requests.post(GHL_WEBHOOK_URL, json=payload, timeout=15)
        if resp.status_code in (200, 201, 202):
            print(f"GHL webhook fired: {resp.status_code}")
            return True
        else:
            print(f"GHL webhook failed: {resp.status_code} — {resp.text[:200]}")
            return False
    except Exception as e:
        print(f"GHL webhook error: {e}")
        return False


# ─── MAIN PIPELINE ────────────────────────────────────────────────────────────

def run_pipeline(dry_run: bool = False):
    """
    Full pipeline:
    1. Get next pending topic
    2. Generate AEO-optimized article via Claude
    3. Save Markdown + PDF
    4. Upload PDF to Google Drive
    5. Commit article to GitHub (blogData.ts)
    6. POST to GHL webhook → Facebook
    """
    print(f"\n{'='*60}")
    print(f"DFW Homes & Loans Blog Automation — {datetime.now().strftime('%Y-%m-%d %H:%M CT')}")
    print(f"Mode: {'DRY RUN' if dry_run else 'LIVE'}")
    print(f"{'='*60}\n")
    
    topic = get_next_pending_topic()
    if not topic:
        print("No pending topics in queue. All articles published.")
        return
    
    print(f"Next topic: {topic['title']}")
    
    # Step 1: Generate article
    article = generate_article(topic)
    print(f"Article generated: {len(article.get('content', ''))} chars")
    
    # Step 2: Save Markdown
    md_path = save_markdown(topic, article)
    
    # Step 3: Save PDF
    pdf_path = save_pdf(md_path, topic)
    
    if dry_run:
        print("\n[DRY RUN] Skipping Drive upload, GitHub commit, and GHL webhook.")
        print(f"Markdown: {md_path}")
        print(f"PDF: {pdf_path}")
        print("\nDry run complete.")
        return
    
    # Step 4: Upload to Drive
    upload_to_drive(pdf_path)
    
    # Step 5: Build blogData entry and commit to GitHub
    entry = build_blogdata_entry(topic, article)
    commit_to_github(topic, article, entry)
    
    # Step 6: Post to Facebook via GHL
    post_to_facebook_via_ghl(topic, article)
    
    print(f"\nPipeline complete for: {topic['slug']}")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    import sys
    dry_run = "--dry-run" in sys.argv
    run_pipeline(dry_run=dry_run)
