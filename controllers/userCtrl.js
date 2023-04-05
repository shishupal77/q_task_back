const Auth = require('../models/authModel')
const User = require('../models/crudModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {
    register: async (req, res) => {

        let newUser;
        try {
            const {email, password } = req.body;

            const user = await Auth.findOne({ email })
            if (user) return res.status(400).json({ msg: "The email already exists." })

            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10)

            newUser = new Auth({
                email, password: passwordHash
            })

            // Save mongodb
            try {
                await newUser.save()
            } catch (error) {
                return res.json({msg:error})
                console.log(error)
            }
                // res.json({msg:"Register Success!"})


            // Then create jsonwebtoken to authentication
            const accesstoken = createAccessToken({ id: newUser._id })
            const refreshtoken = createRefreshToken({ id: newUser._id })


            res.json({ accesstoken })

        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err.message })
        }
    },

    login: async (req, res, next) => {
     
        try {
            let user;
            let accesstoken;
            let refreshtoken


            const { email, password} = req.body;
            user = await Auth.findOne({ email })
            if (!user) return res.status(400).json({ msg: "User does not exist." })

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) return res.status(400).json({ msg: "Incorrect password." })
            accesstoken = createAccessToken({ id: user._id })
            refreshtoken = createRefreshToken({ id: user._id })

            res.json({ accesstoken })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err.message })
        }
    },

    create: async(req,res) =>{
        console.log(req.user) ; 
        // return res.status(200)
        try {
            const {  name, age, gender,address } = req.body;
            newOp = new User({
                user_id:req.user.id, name, age, gender,address
            })
            await newOp.save()

            return res.json({ msg: "created successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },
    read: async(req,res) =>{
        try {
            const user_id = req.user.id ; 
            const data = await User.find({user_id:user_id}) ; 
            return res.status(200).json({ data })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },
    update: async(req,res) =>{
        try {
            return res.json({ msg: "updated successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },
    delete: async(req,res) =>{
        try {
            await User.deleteOne({_id:req.params.id})
            return res.status(200).json({ msg: "Deleted successfully" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }

    },

}
const createAccessToken = (user) => {
  
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = userCtrl;