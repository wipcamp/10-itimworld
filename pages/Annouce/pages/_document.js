import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'


export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags }
  }
  
  render () {
    return (
      <html>
        <Head>
        <title>ประกาศผล Wip Camp #10:Way to IT Professionals Camp</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
          <link rel="stylesheet" type="text/css" href="/static/style.css" />
          <link rel="stylesheet" type="text/css" href="/static/bootstrap.min.css"/>
          <link rel="shortcut icon" href="/static/favicon/favicon.ico" type="image/x-icon"/>
          <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon.png"/>
          <link rel="icon" href="/static/favicon.ico" type="/image/x-icon"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png"/>
          <link rel="manifest" href="/static/favicon/site.webmanifest"/>
          <link rel="mask-icon" href="/static/favicon/safari-pinned-tab.svg" color="#5bbad5"/>
          <script src="static/EQCSS-polyfills.min.js" />
          <script src="static/EQCSS.min.js" />
          <script src="static/script.js" /> 
          {this.props.styleTags}
        </Head>
        <body className="custom_class">
          {this.props.customValue}
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}