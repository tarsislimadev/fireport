import { Transform } from 'stream';
import { Buffer } from 'buffer';
import net, { Socket, TcpSocketConnectOpts } from 'net';
import { URL } from 'url';

export function saveToLog(socket: Socket): Transform {
    return new Transform({
        transform: (chunk, encoding, callback) => {
            let buf = Buffer.from(chunk, encoding);

            console.log('save log', buf.toString('utf8'));

            callback(undefined, chunk);
        }
    });
}

export function saveToFile(socket: Socket): Transform {
    return new Transform({
        transform: (chunk, encoding, callback) => {
            let buf = Buffer.from(chunk, encoding);

            console.log('save file', buf.toString('utf8'));

            callback(undefined, chunk);
        }
    });
}

export function saveToMySQL(socket: Socket): Transform {
    return new Transform({
        transform: (chunk, encoding, callback) => {
            let buf = Buffer.from(chunk, encoding);

            console.log('save mysql', buf.toString('utf8'));

            callback(undefined, chunk);
        }
    });
}

export function saveToSQLite(socket: Socket): Transform {
    return new Transform({
        transform: (chunk, encoding, callback) => {
            let buf = Buffer.from(chunk, encoding);

            console.log('save sqlite', buf.toString('utf8'));

            callback(undefined, chunk);
        }
    });
}

const parseOptions = (socket: Socket): TcpSocketConnectOpts => {

    let text = '', 
        ended = false;

    socket.on("data", (buffer) => { text += buffer.toString("utf8"), ended = true });
    // socket.on("end", function () { ended = true; });

    while (!ended) true;

    console.log('socket text', text);

    let header_host_line = text.match(/^Host: .*(:[0-9]+)?/) || [];
    let header_host = header_host_line[0].substring(6);
    let url_host = new URL(header_host);

    let port: number = parseInt(url_host.port);
    let host: string = url_host.host;

    let opts: TcpSocketConnectOpts = {
        port,
        host,
        localAddress: socket.remoteAddress,
        localPort: socket.remotePort,
        family: socket.remoteFamily ? parseInt(socket.remoteFamily) : undefined
    };

    return opts;
};

export const fromHere = (socket: Socket): Socket => {
    return net.connect(parseOptions(socket));
}
