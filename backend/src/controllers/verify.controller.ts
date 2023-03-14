import { Request,Response } from "express"
import assertionService from "../services/assertion.service"

const checkAssertion=async (req:Request,res:Response)=>{
    const {id}=req.params
    let detail=await assertionService.assertionDetail(id,false)
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
    checkAssertion
}