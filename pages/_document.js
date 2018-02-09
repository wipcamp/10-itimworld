import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import injectGlobal from '../components/Core/injectGlobal'

injectGlobal()

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
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          
          <link rel="stylesheet" href="/static/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/static/css/quill.snow.custom.css" />
          <link rel="stylesheet" href="/static/css/react-date.css"/>
          
          <link rel="shortcut icon" href="/static/img/favicon/favicon.ico" type="image/x-icon"/>
          <link rel="apple-touch-icon" sizes="60x60" href="/static/img/apple-touch-icon.png"/>
          <link rel="icon" href="/static//img/favicon/favicon.ico" type="/static/img/x-icon"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/static/img/favicon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/static/img/favicon/favicon-16x16.png"/>
          <link rel="manifest" href="/static/img/favicon/site.webmanifest"/>
          <link rel="mask-icon" href="/static/img/favicon/safari-pinned-tab.svg" color="#5bbad5"/>
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
