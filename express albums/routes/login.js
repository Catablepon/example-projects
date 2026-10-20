import { Router } from 'express'
const router = Router()

import { login, refresh, logout } from '../controllers/login.js'

// Login post route, pass in the login controller
router.post('/login', login)
router.post('/refresh', refresh)
router.post('/logout', logout)

export default router