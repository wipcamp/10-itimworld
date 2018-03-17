import Document, { Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import injectGlobal from '../components/Core/injectGlobal'
import htmlescape from 'htmlescape'

const { API_URL } = process.env
const env = { API_URL }

injectGlobal()

const googleTagManager = `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-WD7J6T9');

`

const googleTagManagerNoScript = `
<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WD7J6T9"
height="0" width="0" style="display:none;visibility:hidden"></iframe>
`

const hotjar = `
(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:775187,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
`

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const { renderPage } = ctx
    const props = await Document.getInitialProps(ctx)
    const sheet = new ServerStyleSheet()
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()
    return { ...page, styleTags, ...ctx }
  }

  render() {
    return (
      <html>
        <Head>
          <title>Itim | WIP Camp #10</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          
          <link rel="stylesheet" href="/static/css/bootstrap.min.css" />
          <link rel="stylesheet" href="/static/css/quill.snow.custom.css" />
          <link rel="stylesheet" href="/static/css/react-date.css"/>
          <link rel="stylesheet" href="/static/css/animate.css"/>
          <link rel="stylesheet" href="/static/web-fonts-with-css/css/fontawesome-all.min.css"/>

          <meta name="description" content="WIP Camp #10 : Ways to IT Professionals Camp ค่ายเส้นทางสู่ฝันนักไอที : ค่าย สำหรับน้องๆ มัธยม ปลาย ที่จะพาน้องๆมาทำความรู้จักกับ ไอที อย่างเต็มตัว ตลอดทั้ง ค่าย น้องๆจะได้รับ ความรู้ ความสนุกสนาน จากพี่ๆ ไอที บางมด แล้วเจอกันนะครับ"/>
          <meta name="keywords" content="wipcamp,itcamp,ค่ายไอที,ค่ายคอม"/>
          <meta property="og:title" content="WIP Camp #10 : Ways to IT Professionals Camp : ค่ายเส้นทางสู่ฝันนักไอที "/>
          <meta property="og:type" content="company"/>
          <meta property="og:url" content="https://itim.wip.camp/"/>
          <meta property="og:image" content="https://itim.wip.camp/static/img/og.jpg"/>
          <meta property="og:site_name" content="WIP Camp #10 : Ways to IT Professionals Camp : ค่ายเส้นทางสู่ฝันนักไอที"/>
          
          <link rel="shortcut icon" href="/static/img/favicon/favicon.ico" type="image/x-icon"/>
          <link rel="apple-touch-icon" sizes="60x60" href="/static/img/apple-touch-icon.png"/>
          <link rel="icon" href="/static/img/favicon/favicon.ico" type="/static/img/x-icon"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/static/img/favicon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/static/img/favicon/favicon-16x16.png"/>
          <link rel="manifest" href="/static/img/favicon/site.webmanifest"/>
          <link rel="mask-icon" href="/static/img/favicon/safari-pinned-tab.svg" color="#5bbad5"/>
          <meta name="msapplication-TileColor" content=" #002D40"/>
          <meta name="theme-color" content=" #002D40"/>

          <script dangerouslySetInnerHTML={{__html: googleTagManager}} />
          <script dangerouslySetInnerHTML={{__html: hotjar}} />

          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <script
            dangerouslySetInnerHTML={{ __html: '__ENV__ = ' + htmlescape(env) }}
          />
          <NextScript />
        </body>        
        <noscript dangerouslySetInnerHTML={{__html: googleTagManagerNoScript}} />

      </html>
    )
  }
}
