import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'

const getUsers = async (_req, res) => {
    const users = await User.find({}).select('username email')//.select('username albums').populate('albums')
    res.status(StatusCodes.OK).json({ users })
}

const createUser = async (req, res) => {
    const { username, email, password, passwordConfirmation } = req.body

    if (!username || !email || !password || !passwordConfirmation) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            msg: 'All fields (username, email, password, password confimation) are required'
        })
    }

    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
        return res.status(StatusCodes.CONFLICT).json({
            success: false,
            msg: 'Username already exists'
        })
    }

    const existingEmail = await User.findOne({ email })
    if (existingEmail) {
        return res.status(StatusCodes.CONFLICT).json({
            success: false,
            msg: 'Email already exists'
        })
    }

    const user = new User({
        username,
        email,
        password,
        passwordConfirmation
    })
    await user.save()
    res.status(StatusCodes.CREATED).json({
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

const getSingleUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
        return res.status(StatusCodes.NOT_FOUND).send({success: false, msg: 'No such user'})
    }
    res.status(StatusCodes.OK).json({ user })
}

export {
    getUsers,
    createUser,
    getSingleUser
}