import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import { UnauthenticatedError } from '../errors/index.js'
import { StatusCodes } from 'http-status-codes'

const login = async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.password)
    if (!(user && passwordCorrect)) {
        throw new UnauthenticatedError('Invalid username or password')
    }

    const userForToken = {
        username: user.username,
        id: user._id
    }

    const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN })
    const refreshToken = jwt.sign(userForToken, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN })

    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })

    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000
    })
    return res.status(StatusCodes.OK).json({ accessToken })
}

const refresh = async (req, res) => {
    if (req.cookies?.jwt) {                              
        const refreshToken = req.cookies.jwt

        const user = await User.findOne({ refreshToken })
        if (!user) {
            return res.status(StatusCodes.FORBIDDEN).json({ msg: 'Forbidden' })
        }

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(StatusCodes.FORBIDDEN).json({ msg: 'Forbidden' })
            }
            const userForToken = {
                username: decoded.username,
                id: decoded.id
            }
            const accessToken = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN })
            return res.status(StatusCodes.OK).json({ accessToken })
        })
    } else {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Unauthorized' })
    }
}

const logout = async (req, res) => {
    if (!req.cookies?.jwt) {
        return res.sendStatus(StatusCodes.NO_CONTENT)
    }

    const refreshToken = req.cookies.jwt
    const user = await User.findOne({ refreshToken })
    if (user) {
        user.refreshToken = null        
        await user.save({ validateBeforeSave: false })
    }

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: process.env.NODE_ENV === 'production' })
    return res.status(StatusCodes.OK).json({ msg: 'Logged out' })
}

export { login, refresh, logout }
