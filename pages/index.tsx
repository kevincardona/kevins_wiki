import Head from 'next/head';
import Home from '@/components/Home';

export default function Index() {
  return (
    <>
      <Head>
        <title>Kevin&apos;s Wiki</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/<generated>"
          sizes="<generated>"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <span className="h-screen block" >
        <Home />
      </span>
    </>
  );
}

