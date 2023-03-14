import { Request,Response } from "express"
import assertionService from "../services/assertion.service"

const assertionDetail=async (req:Request,res:Response)=>{
    const {id}=req.params
    let detail=await assertionService.assertionDetail(id as string)
    if(detail){
        res.status(200).send({
            success:true,
            message:"Badge verified!",
            data:detail
        })
    }
    else throw new Error("Invalid badge!")
}

export default {
    assertionDetail
}