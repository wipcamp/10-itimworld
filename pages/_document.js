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
