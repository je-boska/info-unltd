import { InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Layout from '../components/Layout';
import { getEvents } from '../queries/Events';
import { renderRichTextWithImages } from '../utils/rich-text';

export default function Events({
  events,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const parsedEvents = events.map((event) => ({
    ...event,
    date: new Date(event.date)
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      .toUpperCase(),
  }));

  return (
    <Layout title='EVENTS'>
      {parsedEvents.map(
        ({ title, slug, date, location, description, mediaCollection }) => (
          <div key={slug} className='text-xl md:text-2xl'>
            {mediaCollection.items.map(({ url, height, width }, idx) => (
              <div key={idx}>
                <Image
                  className='w-96'
                  src={url}
                  alt=''
                  height={height}
                  width={width}
                />
              </div>
            ))}
            <h1>{title}</h1>
            <p>{date}</p>
            <p className='mb-6'>{location.toUpperCase()}</p>
            <div className='markup'>
              {renderRichTextWithImages(description)}
            </div>
          </div>
        )
      )}
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
