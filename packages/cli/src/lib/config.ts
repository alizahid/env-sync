import Conf from 'conf'

export const config = new Conf()

export const WEB_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://envsync.vercel.app'
    : 'http://localhost:3000'
