import { createClient } from "redis";
import dotenv from "dotenv"

dotenv.config()

const redis_client = createClient(
    {
        url: process.env.REDIS_URL
    }
);

redis_client.on("connect", () => {
    console.log("Connected to Redis");
});

redis_client.on("error", (err) => {
    console.log(err);
})

await redis_client.connect();

export default redis_client;