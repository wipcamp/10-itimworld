import cookieParser, {checkToken} from '../utils/cookie'

export default (path) => (Component) => {
  Component.getInitialProps = async ({...ctx, req, res}) => {
    if (ctx.req.headers.cookie) {
      let token = await cookieParser(ctx).token
      checkToken(res, token, path)
    }
  }
  return Component
}
