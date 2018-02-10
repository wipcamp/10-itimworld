import {lifecycle} from 'recompose'
import cookieParser, {checkToken} from '../utils/cookie'

export default path => lifecycle({
  async componentDidMount () {
    if (document) {
      let token = await cookieParser({req: false}).token
      checkToken(null, token, path)
    }
  }
})
