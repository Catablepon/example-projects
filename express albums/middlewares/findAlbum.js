import Album from "../models/Album.js";

const findAlbum = async (req, res, next) => {
    try {
        const { id } = req.params

        if (!id) {
            const error = new Error("Album ID is required")
            error.status = 400
            throw error
        }

        const album = await Album.findById(id).exec()

        if (!album) {
            const error = new Error(`No album found with id ${id}`)
            error.status = 404
            throw error
        }

        req.album = album
        next()
    } catch (error) {
        next(error)
    }
}

export default findAlbum