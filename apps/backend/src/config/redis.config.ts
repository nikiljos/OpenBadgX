import { createClient } from "redis";

const client = createClient({
    url: process.env.REDIS_URI,
});

const init=()=>{
    if(process.env.RATE_LIMIT_ENABLE==="true"){
        console.log("Connecting to redis.")
        client.connect();
    }
    else{
        console.log("Redis conenction skipped since rate limiting is disabled.")
    }
}

client.on("ready",()=>console.log("Redis Connection Successful!"))
client.on("error", (err) => console.log("Redis Client Error:", err.message));
client.on("reconnecting", ()=> console.log("\nRedis Reconnecting!\n"));

export default {client,init}