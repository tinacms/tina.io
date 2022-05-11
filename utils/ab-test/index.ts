import { getBucket } from './getBucket'
import { tests as abTests } from '../../content/ab-tests/index.json'

export const getABTestResult = (matchingABTest: any, bucketCookie?: string) => {
  const bucket =
    bucketCookie ||
    getBucket([
      matchingABTest.testId,
      ...matchingABTest.variants.map(t => t.testId),
    ])

  const matchingVariant = matchingABTest.variants.find(t => t.testId == bucket)
  if (matchingVariant) {
    return {
      url: matchingVariant.href,
      bucket,
    }
  } else {
    //invalid bucket, or we're matched with the default AB test
    return {
      url: matchingABTest.href,
      bucket: matchingABTest.testId,
    }
  }
}

export const getABTest = (pathname: string) =>
  abTests.find(test => test.href == pathname)
