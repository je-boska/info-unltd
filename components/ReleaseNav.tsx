import Link from 'next/link';
import { Release } from '../types/shared';

export default function ReleaseNav({
  current,
  next,
  prev,
  first,
  last,
}: {
  current: Release;
  next: Release;
  prev: Release;
  first: Release;
  last: Release;
}) {
  return (
    <div className='text-lg md:text-xl lg:text-2xl flex'>
      <Link href={`/releases/${next ? next.slug : first.slug}`}>←</Link>
      <p className='px-2'>{current.catalogNumber}</p>
      <Link href={`/releases/${prev ? prev.slug : last.slug}`}>→</Link>
    </div>
  );
}
