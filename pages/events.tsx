import Image from 'next/image';
import Layout from '../components/Layout';

import { InferGetStaticPropsType } from 'next';
import { getEvents } from '../queries/Events';
import Carousel from '../components/Carousel';

export default function Events({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title='EVENTS'>
      {events.map(({ title, slug, mediaCollection }) => (
        <div key={slug} className='max-w-4xl mx-auto mb-20'>
          <Carousel media={mediaCollection.items} />
          <h3 className='text-xl md:text-2xl'>{title}</h3>
        </div>
      ))}
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
