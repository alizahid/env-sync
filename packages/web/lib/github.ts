import axios from 'axios'

export const getToken = async (code: string): Promise<string> => {
  const { data } = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      client_id: process.env.GITHUB_ID,
      client_secret: process.env.GITHUB_SECRET,
      code
    },
    {
      headers: {
        accept: 'application/json'
      }
    }
  )

  return data.access_token
}

type GitHubUser = {
  id: number
  login: string
}

export const getUser = async (token: string): Promise<GitHubUser> => {
  const { data } = await axios.get('https://api.github.com/user', {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  return data
}

export const getEmail = async (token: string): Promise<string> => {
  const { data } = await axios.get('https://api.github.com/user/emails', {
    headers: {
      authorization: `Bearer ${token}`
    }
  })

  const primary = data.find(({ primary }) => primary)

  if (!primary) {
    throw {
      code: 404,
      message: 'Email not found'
    }
  }

  return primary.email
}
