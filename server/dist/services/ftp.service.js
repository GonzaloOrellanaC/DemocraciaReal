"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileTest = exports.saveFile = exports.connectFTPClient = void 0;
const tslib_1 = require("tslib");
const ftp = (0, tslib_1.__importStar)(require("basic-ftp"));
const ftpNode_1 = require("../ftpNode");
const ftpClient = new ftp.Client();
const connectFTPClient = async () => {
    await ftpClient.access({
        host: ftpNode_1.ftpConnection.url,
        user: ftpNode_1.ftpConnection.user,
        password: ftpNode_1.ftpConnection.password,
        secure: true,
        secureOptions: {
            rejectUnauthorized: false
        }
    });
};
exports.connectFTPClient = connectFTPClient;
const saveFile = async (file, name) => {
    try {
        /* console.log(file) */
        await (0, exports.connectFTPClient)();
        /* const uint8View = new Uint8Array(file) */
        const blob = new Blob([file.buffer], { type: file.mimetype });
        const fileURL = URL.createObjectURL(blob);
        console.log(fileURL);
        /* const readableStream = fs.readFileSync(fileURL, {encoding: 'utf8'})

        console.log(readableStream) */
        /* const buffer = Buffer.from(file.buffer, 'base64')
    console.log(buffer.toString('base64').length) */
        /* const uint8View = new Uint8Array(file.buffer); */
        /* const myArrayBuffer = fs.readFileSync(file, 'binary');
        console.log(myArrayBuffer) */
        await ftpClient.uploadFromDir(`${fileURL}`, `files/`);
        ftpClient.close();
        return true;
    }
    catch (error) {
        console.log(error);
        console.log(Object.keys(error));
        ftpClient.close();
        return null;
    }
};
exports.saveFile = saveFile;
const readFileTest = async () => {
    await (0, exports.connectFTPClient)();
    try {
        const list = await ftpClient.list('/files');
        list.forEach((el) => {
            console.log(el.name);
        });
    }
    catch (error) {
        console.log(error);
    }
    ftpClient.close();
};
exports.readFileTest = readFileTest;
//# sourceMappingURL=ftp.service.js.map