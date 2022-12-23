import Carousel from '../../components/Carousel';
import Layout from '../../components/Layout';
import ReleaseNav from '../../components/ReleaseNav';

import { InferGetStaticPropsType } from 'next';
import { getReleasePaths, getReleases } from '../../queries/Releases';
import { renderRichTextWithImages } from '../../utils/rich-text';

export default function Release({
  releases,
  params,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const release = releases.filter((item) => item.slug === params.slug)[0];

  const { title, artist, description, artworkCollection, bandcampEmbed } =
    release;

  const metaTitle = artist.toUpperCase() + ' - ' + title;

  return (
    <Layout title={metaTitle}>
      <div className='flex justify-end mx-4'>
        <ReleaseNav
          current={release}
          next={releases[releases.indexOf(release) + 1]}
          prev={releases[releases.indexOf(release) - 1]}
          first={releases[0]}
          last={releases[releases.length - 1]}
        />
      </div>
      <div className='m-4 grid md:grid-cols-2 gap-4'>
        <div className='md:order-2'>
          <Carousel media={artworkCollection.items} artwork />
          {bandcampEmbed ? (
            <div
              className='mt-4 w-full'
              dangerouslySetInnerHTML={{ __html: bandcampEmbed }}
            ></div>
          ) : null}
        </div>
        <div className='md:order-1 max-w-3xl text-lg md:text-xl lg:text-2xl'>
          <h2 className='mb-6'>
            <span>{artist}</span>
            <br />
            <span>{title}</span>
          </h2>
          <div className='rich-text'>
            {renderRichTextWithImages(description)}
          </div>
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
  const releases = await getReleases();

  return {
    props: { releases, params },
    revalidate: 60 * 60,
  };
}
