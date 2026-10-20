import { StatusCodes } from 'http-status-codes'
import { APIError } from '../errors/index.js'

const errorHandler = (err, req, res, _next) => {
    console.error(err.stack)

    if(err instanceof APIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    else if (err.name === 'ValidationError') {
        let errors = {}
        Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message
        })
        return res.status(StatusCodes.BAD_REQUEST).send(errors)
    }
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'There was an error, please try again'})
}

export default errorHandler