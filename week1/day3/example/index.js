// https://nodejs.dev/en/learn/the-nodejs-event-emitter/

import EventEmitter from "events";
import dotenv from "dotenv"

dotenv.config();

// console.log(EventEmitter);
const eventEmitter = new EventEmitter();

// console.log(eventEmitter);

function subsMessage(isSubscribe) {
    if(isSubscribe) {
        console.log("Thanks for subscribe!");
    }else{
        console.log("Please subscribe!");
    }
}

eventEmitter.once("events", (data) => {
    subsMessage(data.isSubscribe);
})

eventEmitter.emit("events", { name: "joe", isSubscribe: false });

console.log(process.env.PORT); // 8123818381