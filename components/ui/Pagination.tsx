import Link from 'next/link';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { PAGINATION_ITEM, POST_CARD } from '@/component/styles/pagination';
import { EYEBROW, SUB_HEADING } from '@/component/styles/typography';
import { cn } from '@/lib/utils';
import { TextLinkArrow } from './TextLink';

/**
 * Pagination (#4964). Two pieces:
 * - Pagination: numbered pages for a list (‹ Previous 1 2 3 … 24 Next ›).
 *   On phones only ‹ [3] › shows.
 * - PostPagination: the previous / next post cards at the end of a post.
 */

const ELLIPSIS = 'ellipsis';

/** First, last, the current page and its neighbours, with gaps as ellipses. */
const pageWindow = (
  current: number,
  total: number,
): (number | typeof ELLIPSIS)[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  if (current <= 3) {
    return [1, 2, 3, 4, ELLIPSIS, total];
  }
  if (current >= total - 2) {
    return [1, ELLIPSIS, total - 3, total - 2, total - 1, total];
  }
  return [1, ELLIPSIS, current - 1, current, current + 1, ELLIPSIS, total];
};

interface PaginationProps {
  currentPage: number;
  numPages: number;
  /** The URL for a page number. */
  hrefFor: (page: number) => string;
  labels: {
    pagination: string;
    previous: string;
    next: string;
    page: (page: number) => string;
  };
}

export const Pagination = ({
  currentPage,
  numPages,
  hrefFor,
  labels,
}: PaginationProps) => {
  if (numPages <= 1) {
    return null;
  }
  const pages = pageWindow(currentPage, numPages);

  return (
    <nav aria-label={labels.pagination}>
      <ul className="flex flex-wrap items-center justify-center gap-1">
        {currentPage > 1 && (
          <li>
            <Link
              href={hrefFor(currentPage - 1)}
              className={PAGINATION_ITEM}
              aria-label={labels.previous}
            >
              <BiChevronLeft aria-hidden="true" className="size-5" />
              <span className="hidden sm:inline">{labels.previous}</span>
            </Link>
          </li>
        )}
        {pages.map((page, index) =>
          page === ELLIPSIS ? (
            <li
              // Two ellipses at most: one before the current page, one after.
              key={
                index < pages.indexOf(currentPage)
                  ? 'ellipsis-start'
                  : 'ellipsis-end'
              }
              aria-hidden="true"
              className={cn(PAGINATION_ITEM, 'hidden sm:inline-flex')}
            >
              …
            </li>
          ) : (
            <li
              key={page}
              className={page === currentPage ? undefined : 'hidden sm:block'}
            >
              <Link
                href={hrefFor(page)}
                className={PAGINATION_ITEM}
                aria-label={labels.page(page)}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </Link>
            </li>
          ),
        )}
        {currentPage < numPages && (
          <li>
            <Link
              href={hrefFor(currentPage + 1)}
              className={PAGINATION_ITEM}
              aria-label={labels.next}
            >
              <span className="hidden sm:inline">{labels.next}</span>
              <BiChevronRight aria-hidden="true" className="size-5" />
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

interface PostLink {
  title: string;
  slug: string;
}

interface PostPaginationProps {
  previous?: PostLink | null;
  next?: PostLink | null;
  labels: { previous: string; next: string };
}

const PostCard = ({
  post,
  label,
  align,
}: {
  post: PostLink;
  label: string;
  align: 'left' | 'right';
}) => (
  <Link
    href={post.slug}
    className={cn(
      POST_CARD,
      'h-full',
      align === 'right' && 'items-end text-right',
    )}
  >
    <span className={EYEBROW}>{label}</span>
    <span className={cn(SUB_HEADING, 'inline-flex items-center gap-1.5')}>
      {post.title}
      <TextLinkArrow />
    </span>
  </Link>
);

/** The previous / next post cards at the end of a blog post. */
export const PostPagination = ({
  previous,
  next,
  labels,
}: PostPaginationProps) => {
  if (!previous?.slug && !next?.slug) {
    return null;
  }
  return (
    <nav
      aria-label={`${labels.previous} / ${labels.next}`}
      className="mt-8 grid gap-4 sm:grid-cols-2"
    >
      {previous?.slug && (
        <PostCard post={previous} label={labels.previous} align="left" />
      )}
      {next?.slug && (
        <div className="sm:col-start-2">
          <PostCard post={next} label={labels.next} align="right" />
        </div>
      )}
    </nav>
  );
};
