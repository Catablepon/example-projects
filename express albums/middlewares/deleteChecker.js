// import data from '../data/albums.json' with { type: "json"}
// const albums = data.albums

export const deleteChecker = (req, res, next) => {
    const { user } = req.query

    if (!user) {
        return res.status(400).json({ success: false, msg: "Unauthorized"})
    }
    next()
}