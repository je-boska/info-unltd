import Head from 'next/head';
import { ReactNode } from 'react';
import Header from './Header';

export default function Layout({
  title,
  children,
}: {
  title?: string;
  children: ReactNode;
}) {
  const metaTitle = `INFO | ${title ? title : 'INFO'}`;
  return (
    <>
      <Head>
        <title>{metaTitle}</title>
        <meta
          name='description'
          content='INFO is dedicated to sound in the expanded field. Researching, cataloging, and curating exceptional sonics and practices in contemporary art and music.'
        />
        <link rel='icon' href='/favicon.ico' />
        <meta property='og:title' content={metaTitle} />
        <meta property='og:site_name' content='INFO' />
        <meta
          property='og:description'
          content='INFO is dedicated to sound in the expanded field. Researching, cataloging, and curating exceptional sonics and practices in contemporary art and music.'
        />
        <meta property='og:url' content='https://decomposition.info' />
        <meta property='og:type' content='website' />
      </Head>
      <Header />
      <main className='max-w-[1920px] mx-auto'>{children}</main>
    </>
  );
}
