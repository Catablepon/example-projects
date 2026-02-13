import express from 'express'
import findAlbum from '../middlewares/findAlbum.js'
import login from '../middlewares/auth.js'
const router = express.Router()

import {
    getAlbums,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum
} from '../controllers/albums.js'

/* import {
    deleteChecker,
} from '../middlewares/deleteChecker.js' */

router.get('/', getAlbums)
router.get('/:id', findAlbum, getAlbum)
router.post('/', createAlbum)
router.put('/:id', findAlbum, updateAlbum)
router.delete('/:id', findAlbum, login, deleteAlbum)

export default router
