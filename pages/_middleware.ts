import { NextRequest, NextResponse } from 'next/server'
import { getBucket } from '../utils/getABBucket'

import abTests from '../ab-tests.json'

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  const matchingABTest = abTests.find(test => test.href == url.pathname)
  if (matchingABTest) {
    const COOKIE_NAME = `bucket-${matchingABTest.id}`
    const bucket =
      req.cookies[COOKIE_NAME] ||
      getBucket([matchingABTest.id, ...matchingABTest.variants.map(t => t.id)])

    url.pathname =
      matchingABTest.variants.find(t => t.id == bucket)?.href ||
      matchingABTest.href

    url.searchParams.set('ab', bucket)

    const res = NextResponse.rewrite(url)

    // Add the bucket to cookies if it's not there
    if (!req.cookies[COOKIE_NAME]) {
      res.cookie(COOKIE_NAME, bucket)
    }

    return res
  }

  return NextResponse.next()
}
