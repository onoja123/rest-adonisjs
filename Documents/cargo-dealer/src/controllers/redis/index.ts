import Redis from "ioredis";
import { config } from "dotenv";

const redisHost = process.env.REDIS_HOST || "";
const redisPort = 18866;
const redisPassword = process.env.REDIS_PASSWORD || "";

config();

const client = new Redis({
  host: redisHost,
  port: redisPort,
  password: redisPassword,
});
client.on("connect", async () => {
  console.log("CONNECTED TO OUR REDIS INSTANCE ⚡⚡⚡⚡⚡⚡⚡⚡");
});
client.on("error", (err) => {
  console.log("ERROR CONNECTING TO REDIS ⚡⚡⚡⚡⚡⚡⚡⚡", err);
});

export default client;

//note .env been show shege nah why the keys dey exposed, if i dont do it like this , redis wont comment
