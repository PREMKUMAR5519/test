const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()
const User = require("../models/User")

// PoST /auth/register
router.post("/register", async (req, res)=>{
    const {username,password}=req.body

    try {
        let user = await User.findOne({username})
        if (user){
            return res.status(400).json({msg:"username already exists"})
        }
        user = new User ({
            username,
            password
        })
        await user.save()
        res.status(201).json({msg:"user register sucessfully"})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
        
    }
})// post/auth/login

router.post("/login", async (req, res)=>{
    const {username,password}=req.body

    try {
        let user = await User.findOne({username})
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
                username:user.username,
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
module.exports = router