import * as ftp from 'basic-ftp'
import fs from 'fs'
import { ftpConnection } from '@/ftpNode'

const ftpClient = new ftp.Client()

export const connectFTPClient = async () => {
    await ftpClient.access({
        host: ftpConnection.url,
        user: ftpConnection.user,
        password: ftpConnection.password,
        secure: true,
        secureOptions: {
            rejectUnauthorized: false
        }
    })
}

export const saveFile = async (file: any, name: string) => {
    try {
        /* console.log(file) */
        await connectFTPClient()
        /* const uint8View = new Uint8Array(file) */
        const blob = new Blob([file.buffer], {type: file.mimetype})
        const fileURL = URL.createObjectURL(blob)
        console.log(fileURL)
        /* const readableStream = fs.readFileSync(fileURL, {encoding: 'utf8'})

        console.log(readableStream) */
            /* const buffer = Buffer.from(file.buffer, 'base64')
        console.log(buffer.toString('base64').length) */
        /* const uint8View = new Uint8Array(file.buffer); */
        /* const myArrayBuffer = fs.readFileSync(file, 'binary');
        console.log(myArrayBuffer) */
        await ftpClient.uploadFromDir(`${fileURL}`, `files/`)
        ftpClient.close()
        return true
    } catch (error) {
        console.log(error)
        console.log(Object.keys(error))
        ftpClient.close()
        return null
    }
}

export const readFileTest = async () => {
    await connectFTPClient()
    try {
        const list = await ftpClient.list('/files')
        list.forEach((el) => {
            console.log(el.name)
        })
    } catch (error) {
        console.log(error)
    }
    ftpClient.close()
}