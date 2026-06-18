import { NextResponse } from "next/server"

/**
 * IndexNow submission endpoint
 * Called post-deploy to notify Bing, Yandex, and other IndexNow-enabled
 * search engines of updated URLs.
 *
 * IndexNow key is stored in INDEXNOW_KEY env var.
 * The key file is served at /[key].txt via public/ directory.
 *
 * POST /api/indexnow — submits all canonical USHI URLs
 */
export async function POST() {
  const key = process.env.INDEXNOW_KEY
  if (!key) {
    return NextResponse.json({ error: "INDEXNOW_KEY not configured" }, { status: 500 })
  }

  const host = "intel.nofluffmarketing.io"
  const urlList = [
    `https://${host}/`,
    `https://${host}/buy`,
    `https://${host}/about`,
    `https://${host}/realtor`,
    `https://${host}/privacy`,
    `https://${host}/terms`,
  ]

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host,
        key,
        keyLocation: `https://${host}/${key}.txt`,
        urlList,
      }),
    })

    return NextResponse.json({
      status: res.status,
      message: res.status === 200 ? "IndexNow submission accepted" : "IndexNow submission queued",
      urlCount: urlList.length,
    })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
