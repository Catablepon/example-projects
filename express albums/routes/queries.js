import express from 'express'
const router = express.Router()

import {
    getAllAlbums
} from '../controllers/albums.js'

router.get('/', getAllAlbums)

export default router