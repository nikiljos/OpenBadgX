import { Request, Response } from "express";
import userService from "../services/user.service";

const detail = async (req: Request, res: Response) => {
    // console.log("auth passed")
    let data=await userService.userDetail(res.locals.userId)
    res.status(200).send({
        success: true,
        message: "Pong",
        data
    });
};

export default {
    detail
};
