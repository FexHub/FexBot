// Import modules
import path from 'path';
import fs from 'fs';
import url from 'url';

let __dirname=path.dirname(url.fileURLToPath(import.meta.url))

function createLogs(date) {
    const logsPath = path.join(__dirname, '../logs/');
    fs.writeFileSync(path.join(logsPath, `FexBot_${date.toLocaleDateString()}.txt`), '', {
        encoding: "utf8",
        flag: "a+",
        mode: 0o666
    });
    return `FexBot_${date.toLocaleDateString()}.txt`
}

function writeLogs(file, text, date, time, type) {
    const logsPath = path.join(__dirname, `../logs/${file}`);
    fs.writeFileSync(logsPath, `${type}: ${text} | ${date} ${time}\n`, {
        encoding: "utf8",
        flag: "a+",
        mode: 0o666
    });
}

export default {
    createLogs: createLogs,
    writeLogs: writeLogs,
}