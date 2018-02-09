import cookie from 'cookie'

export default (ctx) => cookie.parse(
  ctx.req ? ctx.req.headers.cookie : document.cookie
)

export const checkToken = async (res, token, path) => {
  if (token) {
    await res.writeHead(302, {
      Location: path
    })
    res.end()
    res.finished = true
  }
}
