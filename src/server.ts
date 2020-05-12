import net from 'net';
// import { resolve } from 'path';
// import { createWriteStream as writeFile } from 'fs';

import * as save from './lib/save';

function startServer(port: number, host: string) : net.Server {
    let server: net.Server;

    server = net.createServer(function (socket) {
        // let file = resolve('logs', Date.now().toString() + '.html');

        socket
            .pipe(save.saveToLog(socket))
            .pipe(save.saveToFile(socket))
            .pipe(save.saveToMySQL(socket))
            .pipe(save.saveToSQLite(socket))
            .pipe(socket)
            // .pipe(fromHere(socket));
            // .pipe(writeFile(file, { encoding: "utf8" }), { end: true });
    });

    server.on("connection", function (connection) {
        console.log("server connection", Date.now());
        console.log('server', connection.localAddress, connection.localPort);
        console.log('client', connection.remoteAddress, connection.remotePort, connection.remoteFamily);
    });

    server.on("error", function (err) {
        console.error("server error", err);
        // server.close();
        // process.exit(1);
    });

    server.on("close", function () {
        console.log("server close", Date.now());
    });

    server.listen(port, host, function () {
        let add = server.address();
        let address = typeof add === 'string' ? add : JSON.stringify(add);
        console.log('Server is on ' + address);
    });

    return server;
}

export function run() {
    // startServer(80, 'localhost');
    // startServer(443, 'localhost');
    startServer(9050, 'localhost');
};
