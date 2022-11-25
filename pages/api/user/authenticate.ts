import type { NextApiRequest, NextApiResponse } from 'next'
import { sign } from "jsonwebtoken"
import bcrypt from "bcrypt"
import executeQuery from '../../../components/mysql'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { username, password } = JSON.parse(req.body) // Testpass: 9A613JlK123
    //TODO: Authenticate

    //Mock data
    const accountID = 6
    const accountName = "MEDNIGHT"

    const hash = (await executeQuery("SELECT password FROM accounts WHERE username = ?", [username]) as any)

    console.log(hash)
    const compare = (await bcrypt.compare(password, ""))
    console.log(compare)

    const jwt = sign({ sub: accountID, name: accountName, iat: Math.floor((new Date()).getTime() / 1000) }, process.env["staymta-private-key"]!.toString(), { expiresIn: '1h' })
    res.status(200).json({ jwt, accountID, accountName })
}
