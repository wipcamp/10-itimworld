import io from 'socket.io-client'
import env from '../../utils/env'

const socket = io.connect(env.SOCKET_URL)

export default socket
