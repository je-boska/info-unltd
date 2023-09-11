import Layout from '../components/Layout';

import { InferGetStaticPropsType } from 'next';
import { getEvents } from '../queries/Events';
import Carousel from '../components/Carousel';

export default function Events({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title='EVENTS'>
      <div className='m-4'>
        {events.map(({ title, slug, mediaCollection }) => (
          <div
            key={slug}
            className='max-w-4xl 2xl:max-w-6xl mx-auto mb-8 md:mb-20'
          >
            <Carousel media={mediaCollection.items} />
            <h3 className='text-xl text-center'>{title}</h3>
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      events: await getEvents(),
    },
    revalidate: 60 * 60,
  };
}
