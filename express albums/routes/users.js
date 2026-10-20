import { Router } from 'express'
import { getUsers, createUser, getSingleUser } from '../controllers/users.js'

const router = Router()

router.get('/', getUsers)
router.post('/register', createUser)
router.get('/:id', getSingleUser)

export default router