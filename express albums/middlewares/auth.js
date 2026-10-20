import jwt from 'jsonwebtoken'
import { UnauthenticatedError } from '../errors/index.js'

const authUser = async (req, _res, next) => {
    //console.log("Auth header:", req.headers.authorization)
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('No token in header')
    }
    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const { id, username } = decoded
        req.user = { id, username }
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
        throw new UnauthenticatedError('Login expired')
        } else if (error instanceof jwt.JsonWebTokenError) {
        throw new UnauthenticatedError('Invalid token')
        } else if (error instanceof jwt.NotBeforeError) {
        throw new UnauthenticatedError('Token not yet valid')
        }
        throw error
    }
}
export default authUser