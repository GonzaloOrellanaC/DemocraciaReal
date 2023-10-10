import { saveFile } from '@/services/ftp.service'
import { Router, Request, Response } from 'express'

const router = Router()

router.post(`/saveFile`, async (req: Request, res: Response) => {
    console.log(req.files)
    if (!req.files) {
        res.status(400).json({data: 'No file', state: false})
    } else {
        const fileSaved = await saveFile(req.files[0], req.files[0].originalname)
        console.log(fileSaved)
        if (fileSaved) {
            res.status(200).json({data: `File ${req.files[0].originalname} uploaded.`, state: true})
        } else {
            res.status(400).json({data: 'No file saved', state: false})
        }
    }
})

export default router
