import fs from "fs";


// fs.writeFile('file.txt', 'Hello, World!', (err) => {
//     if (err) throw err;
//     console.log('File created and written successfully!');
// });

// fs.readFile("file1.txt", "utf-8", (err, data) => {
//     // console.log(new Error(err));
//     console.log(data);
// })

// const buff = Buffer.from("Hello Developers");

// // console.log(buff[]);

// console.log(buff.toString());

// const buf = Buffer.alloc(8);
// const bytesWritten = buf.write('Hello');
// console.log('Bytes written:', bytesWritten);
// console.log('Buffer:', buf);

let data = "Hello world!";

const bufferedVersion = Buffer.from(data);

// console.log(bufferedVersion);

fs.writeFile("file.txt", bufferedVersion, (err) => {
    if(err){
        console.log(err);
    }
    console.log("successfully write");
})

fs.readFile("file.txt", "utf-8", (err, data) => {
    console.log(data);
})