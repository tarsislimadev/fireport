
import path from 'path';

export function run() {
    import(path.resolve(__dirname, '../package.json'))
        .then(pkg => process.stdout.write(pkg.version + '\n'));
};
