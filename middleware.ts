import { NextRequest, NextResponse } from 'next/server'
import { getExperiment, getABTestResult } from './utils/ab-test'

// Check for AB tests on a given page
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone()

  const matchingABTest = getExperiment(url.pathname)

  if (!matchingABTest) {
    return NextResponse.next()
  }

  const COOKIE_NAME = `bucket-${matchingABTest.testId}`

  const abTestResult = getABTestResult(matchingABTest, req.cookies[COOKIE_NAME])
  url.pathname = abTestResult.url

  const res = NextResponse.rewrite(url)

  // Add the bucket to cookies if it's not there
  if (!req.cookies[COOKIE_NAME]) {
    res.cookies.set(COOKIE_NAME, abTestResult.bucket)
  }

  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|favicon.ico).*)',
  ],
}
