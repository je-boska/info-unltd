import Carousel from '../../components/Carousel';
import Layout from '../../components/Layout';

import { InferGetStaticPropsType } from 'next';
import { getReleasePage, getReleasePaths } from '../../queries/Releases';

export default function Release({
  release,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { title, artist, artworkCollection } = release;

  const metaTitle = artist.toUpperCase() + ' - ' + title;

  return (
    <Layout title={metaTitle}>
      <div className='m-4'>
        <Carousel media={artworkCollection.items} />
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
