import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

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
          <link rel="stylesheet" href="/static/css/globalstyle.css" />
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
