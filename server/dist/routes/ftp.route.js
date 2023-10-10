"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ftp_service_1 = require("../services/ftp.service");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post(`/saveFile`, async (req, res) => {
    console.log(req.files);
    if (!req.files) {
        res.status(400).json({ data: 'No file', state: false });
    }
    else {
        const fileSaved = await (0, ftp_service_1.saveFile)(req.files[0], req.files[0].originalname);
        console.log(fileSaved);
        if (fileSaved) {
            res.status(200).json({ data: `File ${req.files[0].originalname} uploaded.`, state: true });
        }
        else {
            res.status(400).json({ data: 'No file saved', state: false });
        }
    }
});
exports.default = router;
//# sourceMappingURL=ftp.route.js.map