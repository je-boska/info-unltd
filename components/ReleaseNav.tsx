import Link from 'next/link';
import { Release } from '../types/shared';

export default function ReleaseNav({
  current,
  next,
  prev,
}: {
  current: Release;
  next: Release;
  prev: Release;
}) {
  return (
    <div className='text-lg md:text-xl lg:text-2xl flex'>
      {next ? <Link href={`/releases/${next.slug}`}>←</Link> : null}
      <p className='px-2'>{current.catalogNumber}</p>
      {prev ? <Link href={`/releases/${prev.slug}`}>→</Link> : null}
    </div>
  );
}
