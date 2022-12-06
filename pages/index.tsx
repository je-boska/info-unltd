import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/Layout';
import { getReleases } from '../queries/Releases';

export default function Home({
  releases,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title='INFO'>
      <main>
        <div className='grid md:grid-cols-2 m-4'>
          {releases.map(({ title, artist, slug, artwork }) => (
            <Link href={`/releases/${slug}`} key={slug}>
              <div>
                <Image
                  className='w-full h-auto'
                  src={artwork.url}
                  alt={artwork.title}
                  width={artwork.width}
                  height={artwork.height}
                />
                <h2>
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
