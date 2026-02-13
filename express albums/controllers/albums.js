import Album from "../models/Album.js"

const getAlbums =  async (req, res, next) => {
    try {
        const { decade } = req.query
        const albums = await Album.find({}).exec()

        const filteredAlbums = decade
            ? albums.filter(album => album.getDecade().toLowerCase() === decade.toLowerCase())
            : albums

        res.status(200).json({ success: true, data: filteredAlbums})

        // VIRTUAL FUNCTION TEST
        // const album = await Album.findOne({ title: "Aja" })
        // console.log(album.fullTitle)

    } catch (error) {
        next(error)
    }
}
const getAlbum = async (req, res) => {
    res.status(200).json({ success: true, data: req.album })
}




const createAlbum = async (req, res, next) => {
    try {
        const { artist, title, year, genre, tracks } = req.body

        if(!artist || !title || !year || !genre || !tracks) {
            const error = new Error("Artist, title, year, genre and tracks fields are required")
            error.status = 400
            throw error
        }

        const album = await Album.create({ artist, title, year, genre, tracks })
        res.status(201).json({ success:true, data: album })
    } catch (error) {
        if (error.name === "ValidationError") {
            error.status = 400
        }
        next(error)
    }
}


const updateAlbum = async (req, res, next) => {
    try {
        const { artist, title, year, genre, tracks } = req.body

        if(!artist || !title || !year || !genre || !tracks) {
            const error = new Error("Artist, title, year, genre and tracks fields are required")
            error.status = 400
            throw error
        }
        
        const updatedAlbum = await Album.findByIdAndUpdate(
            req.album._id,
            { artist, title, year, genre, tracks },
            { new: true, runValidators: true})

        if (!updatedAlbum) {
            const error = new Error("Album not found")
            error.status = 404
            throw error
        }

        res.status(201).json({ success:true, message: "Album updated successfully"})
    } catch (error) {
        next(error)
    }
}

const deleteAlbum = async (req, res, next) => {
    try {
        await Album.findByIdAndDelete(req.album._id).exec()
        res.status(200).json({ success:true, message: "Album deleted successfully"})
    } catch (error) {
        next(error)
    }
}

const getAllAlbums = async (req, res) => {
    const { sort, numericFilters, fields, search, startYear, endYear } = req.query
    const queryObject = {}

    const page = Math.max(1, Number(req.query.page) || 1)
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10))
    const skip = (page - 1) * limit

    if (search) {
        queryObject.$or = [
            { artist: { $regex: search, $options: 'i'} },
            { title: { $regex: search, $options: 'i'} }
        ]
    }
    // if (artist) queryObject.artist = { $regex: artist, $options: 'i'}
    // if (title) queryObject.title = { $regex: title, $options: 'i'}

    if (startYear && endYear) {
        queryObject.year = { $gte: Number(startYear), $lte: Number(endYear)}
    }


    if (numericFilters) {
        const operatorMap = {
            '>' : '$gt',
            '>=' : '$gte',
            '=' : '$eq',
            '<' : '$lt',
            '<=' : '$lte',
        }
        const regEx = /\b(>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx,(match) => `-${operatorMap[match]}-`)
        console.log(filters)
        const options = ['year']
        filters = filters.split(',').forEach((item) => {
            const [field,operator,value] = item.split('-')
            if (options.includes(field)) {
                queryObject[field] = {[operator] : Number(value)}
            }
        })
    }
    console.log(queryObject)

    let result = Album.find(queryObject)

    if (fields) {
        const fieldList = fields.split(',').join(' ')
        result = result.select(fieldList)
    }

    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    } else {
        result = result.sort('artist')
    }

    result = result.skip(skip).limit(limit)

    const albums = await result

    const totalAlbums = await Album.countDocuments(queryObject)
    const totalPages = Math.ceil(totalAlbums / limit)

    res.status(200).json({ 
        albums, 
        pagination: {
            currentPage: page,
            totalPages,
            totalAlbums,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        }
    })
}

export {
    getAlbums,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getAllAlbums
}

/* const getAlbum = (req, res) => {
    const { id } = req.params

    const singleAlbum = albums.find(
        (album) => album.id === Number(id)
    )
    if (!singleAlbum) {
        return res.status(404).send("Album not found!")
    }
    return res.status(200).json(singleAlbum)
} */

/* const createAlbum = (req,res) => {
    const { artist, title, year, genre, tracks } = req.body
    if(!artist || !title || !year || !genre || !tracks) {
        return res.status(400).json({ success: false, message: "Missing required fields" })
    }

    const maxId = Math.max(...albums.map(album => album.id), 0)
    const newID = (maxId+1)
    const newAlbum = {
        id:newID,
        artist,
        title,
        year,
        genre,
        tracks
    }
    albums.push(newAlbum)
    res.status(201).json({ success: true, album:newAlbum})
} */

/* const updateAlbum = (req, res) => {
    const { id } = req.params
    const { artist, title, year, genre, tracks } = req.body

    const album = albums.find((album) => album.id === Number(id))

    if (!album) {
        return res.status(404).json({ success: false, msg: `No album found with id ${id}`})
    }
    const newAlbums = albums.map((album) => {
        if (album.id === Number(id)) {
            return { ...album, artist, title, year, genre, tracks}
        }
        return album
    })
    albums.splice(0, albums.length, ...newAlbums)
    res.status(200).json({ success: true, data: newAlbums})
} */

/* const deleteAlbum = (req, res) => {
    const { id } = req.params
    const album = albums.find((album) => album.id === Number(id))
    if (!album) {
        return res.status(404).json({ success:false, msg: `No album found with id ${id}`})
    }
    const newAlbums = albums.filter(
        (album) => album.id !== Number(id)
    )
    albums.splice(0, albums.length, ...newAlbums)
    return res.status(204).json({ success:true })

} */