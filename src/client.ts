
import net from 'net';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export function run(...args: string[]) {

    let text: string = readFileSync(resolve('logs', '1588808727826.txt'), { encoding: 'utf8' });
    text = text.replace(String.fromCharCode(10), String.fromCharCode(10)+String.fromCharCode(13)) + '.' + String.fromCharCode(10) + String.fromCharCode(13);

    let port: number = parseInt(args[0]);
    let host: string = args[1];

    console.log('client port host', port, host);

    if (Number.isNaN(port) || !Number.isInteger(port)) port = 80;
    if (host == undefined) host = 'localhost';

    console.log('resolved port host', port, host);

    const client = net.createConnection({ port, host }, () => {
        console.log('connected to server!');
        client.write(text);
    });

    client.on("error", console.error);

    client.on('data', (data) => {
        console.log(data.toString());
        client.end();
    });

    client.on('end', () => {
        console.log('disconnected from server');
    });

};
