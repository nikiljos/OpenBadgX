export class APIError extends Error{
    statusCode:number
    detailCode:string|undefined
    constructor(message:string,statusCode:number,detailCode?:string){
        super(message)
        this.statusCode=statusCode
        this.detailCode=detailCode
    }
}