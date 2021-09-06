import { NextApiRequest, NextApiResponse } from 'next'
import { Options } from 'next-connect'

export const apiOptions: Options<NextApiRequest, NextApiResponse> = {
  onError(error, req, res) {
    res.status(error.code ?? 500).json({
      error: error.message
    })
  }
}
