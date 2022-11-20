import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { username, id, jwt } = JSON.parse(req.body)

    //TODO: Verify JWT

    

    res.status(200).json({})
}
