import jwt, { JwtPayload } from 'jsonwebtoken'
const jwtSecret = process.env.JWT_SECRET;

//declaration merging to extend JwtPayload type
declare module "jsonwebtoken" {
    export interface JwtPayload {
        userId: string;
    }
}

const generateToken = (userId:string,org?:string) =>
    new Promise((resolve, reject) => {
        jwt.sign(
            {
                userId,
                orgId:org||null
            },
            jwtSecret,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if (err) {
                    reject(err);
                }
                resolve(token);
            }
        );
    });

const checkToken = (token: string) =>
    new Promise<JwtPayload>((resolve, reject) => {
        jwt.verify(token, jwtSecret, (err, decoded) => {
            if (err) {
                reject(err);
            }
            resolve(decoded as JwtPayload);
        });
    });

export default {
    generateToken,
    checkToken
}