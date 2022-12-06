import { InferGetStaticPropsType } from 'next';
import Header from '../components/Header';
import { getInfoPage } from '../queries/Info';
import { renderRichTextWithImages } from '../utils/rich-text';

export default function Info({
  page,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { body } = page;
  return (
    <div>
      <Header />
      <div className='markup max-w-5xl m-4 text-2xl'>
        {renderRichTextWithImages(body)}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const page = await getInfoPage();

  return {
    props: { page },
    revalidate: 60 * 60,
  };
}
