import { getBucket } from './getBucket'
import abTests from '../../ab-tests.json'

export const getABTestResult = (matchingABTest: any, bucketCookie?: string) => {
  const bucket =
    bucketCookie ||
    getBucket([matchingABTest.id, ...matchingABTest.variants.map(t => t.id)])

  const matchingVariant = matchingABTest.variants.find(t => t.id == bucket)
  if (matchingVariant) {
    return {
      url: matchingVariant.href,
      bucket,
    }
  } else {
    //invalid bucket, or we're matched with the default AB test
    return {
      url: matchingABTest.href,
      bucket: matchingABTest.id,
    }
  }
}

export const getABTest = (pathname: string) =>
  abTests.find(test => test.href == pathname)
