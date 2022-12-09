import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';

import { InferGetStaticPropsType } from 'next';
import { getReleases } from '../queries/Releases';

export default function Home({
  releases,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title='INFO'>
      <main>
        <div className='grid md:grid-cols-2 gap-4 m-4'>
          {releases.map(({ title, artist, slug, artworkCollection }) => (
            <Link href={`/releases/${slug}`} key={slug}>
              <div>
                <Image
                  className='w-full h-auto'
                  src={artworkCollection.items[0].url}
                  alt={artworkCollection.items[0].title}
                  width={artworkCollection.items[0].width}
                  height={artworkCollection.items[0].height}
                />
                <h2 className='text-lg md:text-xl lg:text-2xl'>
                  <span>{artist}</span>
                  <br />
                  <span>{title}</span>
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      releases: await getReleases(),
    },
    revalidate: 60 * 60,
  };
}
