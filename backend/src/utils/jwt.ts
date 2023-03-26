import jwt, { JwtPayload } from 'jsonwebtoken'
const jwtSecret = process.env.JWT_SECRET;
const jwtAudience = process.env.JWT_AUDIENCE;

//declaration merging to extend JwtPayload type
declare module "jsonwebtoken" {
    export interface JwtPayload {
        type:string;
        org: string | null;
    }
}

const generateToken = (sub:string,type:string,expiry?:string|number,org?:string) =>
    new Promise<string>((resolve, reject) => {
        jwt.sign(
            {
                type,
                org: org || null,
            },
            jwtSecret,
            {
                subject: sub,
                expiresIn: expiry || "-10s",
                audience: jwtAudience,
            },
            (err, token) => {
                if (err) {
                    reject(err);
                }
                token&&resolve(token);
            }
        );
    });

const checkToken = (token: string,type:string) =>
    new Promise<JwtPayload>((resolve, reject) => {
        jwt.verify(
            token, 
            jwtSecret,
            {
                audience:jwtAudience,
                maxAge:"2d"
            }, 
            (err, decoded:any) => {
                if (err) {
                    reject(err);
                }
                else if(decoded?.type!==type){
                    reject(new Error("Invalid Type")) 
                }
                resolve(decoded as JwtPayload);
            }
        );
    });

export default {
    generateToken,
    checkToken
}