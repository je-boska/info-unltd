import Carousel from '../../components/Carousel';
import Layout from '../../components/Layout';

import { InferGetStaticPropsType } from 'next';
import { getReleasePage, getReleasePaths } from '../../queries/Releases';
import { renderRichTextWithImages } from '../../utils/rich-text';

export default function Release({
  release,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { title, artist, description, artworkCollection } = release;

  const metaTitle = artist.toUpperCase() + ' - ' + title;

  return (
    <Layout title={metaTitle}>
      <div className='m-4 grid md:grid-cols-2 gap-4'>
        <div className='md:order-2'>
          <Carousel media={artworkCollection.items} />
        </div>
        <div className='md:order-1 max-w-3xl text-xl md:text-2xl'>
          <h2 className='mb-6'>
            <span>{artist}</span>
            <br />
            <span>{title}</span>
          </h2>
          <div className='markup'>{renderRichTextWithImages(description)}</div>
        </div>
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
