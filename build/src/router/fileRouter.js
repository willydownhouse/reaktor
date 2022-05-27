"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fileUploadController_1 = __importDefault(require("../controllers/fileUploadController"));
const multer_1 = require("../utils/multer");
const router = express_1.default.Router();
router
    .route('/')
    .post(multer_1.upload.single('upload_file'), fileUploadController_1.default.uploadTomlFile);
exports.default = router;
