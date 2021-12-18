import User from "../../models/user";
import {Request, Response} from 'express'
const login = async (req: Request, res: Response) => {
  const userInfo = await User.findAll({})
    res.send(userInfo)
}

export default login