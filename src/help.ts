
const help = `
  Usage: fireport [command] [options]

  Commands: 

    server [port] [host] ................. Run a server in a port (alias: serve, s)
    help ................................. Print this help, then quit (alias: h)
    version .............................. Print version, then quit (alias: v)

    //CONTINUE
`;

export function run() {
    console.log(`${help}\n`);
};
