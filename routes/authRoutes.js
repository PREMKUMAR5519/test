const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()
const User = require("../models/User")


// PoST /auth/register
router.post("/register", async (req, res)=>{
    const {name,password}=req.body

    try {
        let user = await User.findOne({name})
        if (user){
            return res.status(400).json({msg:"user already exists"})
        }
        user = new User ({
            name,
            password
        })
        await user.save()
        res.status(201).json({msg:"user register sucessfully"})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
        
    }
})
// post/auth/login

router.post("/login", async (req, res)=>{
    const {name,password}=req.body

    try {
        let user = await User.findOne({name})
        if (!user){
            return res.status(400).json({msg:"Invalid user"})
        } 
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({msg:"Invalid password"})

        }
        await user.save()
        const payload = {
            user:{
                id: user._id,
                username:user.name,
            }
        }
        jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'},(err, tokken)=>{
            if (err) throw err
            res.json({tokken})
        }
        )
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
        
    }
})
// GET /auth/logout
router.get('/logout', (req, res)=>{
    res.json({msg: 'user loggedout sucessfully'})
})



module.exports = router