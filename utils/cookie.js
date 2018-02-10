import {Router} from '../routes'
import cookie from 'cookie'

export default (ctx) => cookie.parse(
  ctx.req && ctx.req.headers.cookie ? ctx.req.headers.cookie : document.cookie
)

export const checkToken = async (res, token, path) => {
  if (res && token) {
    await res.writeHead(302, {
      Location: path
    })
    await res.end()
    res.finished = true
  } else if (!token) {
    Router.pushRoute(path)
  }
}
