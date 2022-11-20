import type { NextApiRequest, NextApiResponse } from 'next'
import { sign } from "jsonwebtoken"

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { username, password } = JSON.parse(req.body)
    //TODO: Authenticate

    //Mock data
    const accountID = 6
    const accountName = "MEDNIGHT"

    const jwt = sign({ sub: accountID, name: accountName, iat: Math.floor((new Date()).getTime() / 1000) }, process.env["staymta-private-key"]!.toString(), { expiresIn: '1h' })
    res.status(200).json({ jwt, accountID, accountName })
}
