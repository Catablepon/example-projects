const errorHandler = (err, req, res, _next) => {
    console.error(err.stack)

    const statusCode = err.status || err.statusCode || 500
    const message = err.message || "Internal Server Error"

    res.status(statusCode).json({
        success: false,
        error: {
            message,
            status: statusCode
        }
    })
}

export default errorHandler