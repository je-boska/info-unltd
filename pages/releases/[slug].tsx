import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import { getReleasePage, getReleasePaths } from '../../queries/Releases';

export default function Release({
  release,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { title, artist, artwork } = release;

  const metaTitle = artist.toUpperCase() + ' - ' + title;

  return (
    <Layout title={metaTitle}>
      <div className='m-4'>
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
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await getReleasePaths();

  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }: any) {
  const release = await getReleasePage(params.slug);

  return {
    props: { release },
    revalidate: 60 * 60,
  };
}
