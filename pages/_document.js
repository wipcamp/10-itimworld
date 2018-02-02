import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet, injectGlobal } from 'styled-components'


injectGlobal`
  @font-face {
    font-family: 'pridi-regularr';
    src: url('/static/fonts/Pridi-Regular.ttf');
  }

  @font-face {
    font-family: 'pridi-light';
    src: url('/static/fonts/Pridi-Light.ttf');
  }

  body {
    font-family: 'pridi-light', serif;
    font-size: 15px;
      
    ::-webkit-scrollbar {
      width: 10px;
    }
    
    /* Track */
    ::-webkit-scrollbar-track {
      /* background: #f1f1f1; */
      border-radius: 20px;
      margin: 10px;
      /* background: pink; */
    
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
      border-radius: 20px;
      background: #768694;
    }
    
    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background: #768694;
    } 
  }
  .metro {
    font-size: 1.5em;
    cursor: pointer;
    background-color: #24409b;
    border-color: #24409b;
    max-width: 320px;
    padding: 0.5em 1.6em;
    @media (min-width: 1024px) {
      max-width: 500px;
      padding: 0.6em 4.5em;
    }
  }
  .metro:hover {
    background-color: #1c2e6d;
    border-color: #1c2e6d;
  }
`
export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }

  render() {
    return (
      <html>
        <Head>
          <title>Itim | WIP Camp #10</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="/static/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/static/css/quill.snow.custom.css" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
          <script defer src='/static/js/fontawesome-all.min.js' />
        </body>
      </html>
    )
  }
}
