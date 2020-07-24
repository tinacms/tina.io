function createHeadings(contentRef) {
  let headings = []
  const htmlElements = contentRef.current.querySelectorAll(
    'h1, h2, h3, h4, h5, h6'
  )

  htmlElements.forEach(function(heading: any) {
    headings.push({
      id: heading.id,
      offset: heading.offsetTop,
      level: heading.tagName,
    })
  })
  return headings
}

export function createTocListener(contentRef, setActiveIds) {
  let tick = false
  const BASE_OFFSET = 16
  const THROTTLE_INTERVAL = 100
  const headings = createHeadings(contentRef)

  const throttledScroll = () => {
    let scrollPos = window.scrollY
    let newActiveIds = []
    let activeHeadingCandidates = headings.filter(heading => {
      return heading.offset - scrollPos < BASE_OFFSET
    })
    let activeHeading =
      activeHeadingCandidates.length > 0
        ? activeHeadingCandidates.reduce((prev, current) =>
            prev.offset > current.offset ? prev : current
          )
        : {}

    newActiveIds.push(activeHeading.id)

    if (activeHeading.level != 'H2') {
      let activeHeadingParentCandidates =
        activeHeadingCandidates.length > 0
          ? activeHeadingCandidates.filter(heading => {
              return heading.level == 'H2'
            })
          : []
      let activeHeadingParent =
        activeHeadingParentCandidates.length > 0
          ? activeHeadingParentCandidates.reduce((prev, current) =>
              prev.offset > current.offset ? prev : current
            )
          : {}

      if (activeHeadingParent.id) {
        newActiveIds.push(activeHeadingParent.id)
      }
    }

    setActiveIds(newActiveIds)
  }

  return function onScroll() {
    if (!tick) {
      setTimeout(function() {
        throttledScroll()
        tick = false
      }, THROTTLE_INTERVAL)
    }
    tick = true
  }
}
