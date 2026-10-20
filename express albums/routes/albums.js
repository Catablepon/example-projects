import express from 'express'
import findAlbum from '../middlewares/findAlbum.js'
import authUser from '../middlewares/auth.js'
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

router.get('/getAllAlbums', authUser, getAlbums)
router.get('/:id', findAlbum, getAlbum)
router.post('/', authUser, createAlbum)
router.put('/:id', authUser, findAlbum, updateAlbum)
router.delete('/:id', authUser, findAlbum, deleteAlbum)

export default router
