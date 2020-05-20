import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';

export default (props) => {
  return (
	<Container>
    <Head>
      <link   rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"
        integrity="sha256-9mbkOfVho3ZPXfM7W8sV2SndrGDuh7wuyLjtsWeTI1Q="
        crossOrigin="anonymous"
      />
    </Head>
		<Header />
		{ props.children }
	</Container>
  );
};
