import bcrypt from 'bcryptjs'
import { Schema, model } from 'mongoose'

const userSchema = new Schema ({
    username: { type: String, required: [true, 'An username must be provided'], unique: true},
    email: {
        type: String, 
        required: [true, "Email must be provided"],
        maxLength: [30, 'Email cannot be longer than 30 characters'],
        unique: true
    },
    password: { type: String, required: [true, 'A password must be provided']},
    passwordConfirmation: { 
        type: String, 
        required: [true, 'You need to confirm the typed password'],
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Passwords do not match'
        }},
    refreshToken: {
        type: String,
        default: null
    }
})

userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return 
    }
    const saltRounds = 10
    this.password = await bcrypt.hash(this.password, saltRounds)
    this.passwordConfirmation = undefined
})

export default model('User', userSchema)