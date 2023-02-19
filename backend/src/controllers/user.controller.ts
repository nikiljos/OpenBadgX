import { Request, Response } from "express";

const detail = (req: Request, res: Response) => {
    console.log("auth passed")
    res.status(200).send({
        status: true,
        message: "Pong",
        data:{
            id:res.locals.userId
        }
    });
};

export default {
    detail
};
