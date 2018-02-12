import cookieParser, {checkToken} from '../utils/cookie'

export default (path) => (Component) => {
  Component.getInitialProps = async (ctx) => {
    let token = {}
    if (ctx) {
      token = await cookieParser(ctx).token
      checkToken(ctx.res, token, path)
    }
    return ctx
  }
  return Component
}
