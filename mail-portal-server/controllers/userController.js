const USER = require('../models/userModel');

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

//signup
async function signup(req , res){
    try{
        const {name , email, password} = req.body;
        if (!name || !email || !password) {
            return res.status(500).json({ error: "Please fill all fields.", err })
        }else{
            const existingEmail = await USER.findOne({email : email});
            if (existingEmail) {
                return res.status(500).json({ error: "Email already taken"})
            }else{
                const hashedPassword = await bcrypt.hash(password , 10);
                const user = new USER({
                    name,
                    email,
                    password : hashedPassword,
                })
                await user.save()
                res.status(200).json({message : 'Account created successfully.'})
            }
        }
    }catch(err){
        return res.status(500).json({ error: "Registration failed!! Pleaseeeee try again", err })
    }
}

// login 
async function login(req , res){
    try{
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(500).json({ error: "Please fill all fields.", err })
        }else{
            const user = await USER.findOne({email : email});
            if (!user) {
                return res.status(400).json({ error: "Invalid email or password " })
            }else{
                const isValidPassword = await bcrypt.compare(password , user.password);
                if (isValidPassword) {
                    const userObject = {
                        _id : user._id,
                        name : user.name,
                        email: user.email,
                        photo: user.photo,
                    }
                    const token = await jwt.sign(userObject , process.env.JWT_SECRET,{
                        expiresIn : process.env.EXPIRY,
                    })
                     res.status(200).json({message : 'Successfully signed in.', ...userObject ,token})
                }else{
                    return res.status(400).json({ error: "Invalid email or password " }) 
                }
               
            }
        }
    }catch(err){
        return res.status(500).json({ error: "Login failed!! Pleaseeeee try again", err })
    }
}

// upload Profile Pic
async function uploadProfilePic(req, res) {
    try {
        const user = await USER.findByIdAndUpdate(req.user._id,{
            $set: { photo : req.body.photo }
        },{ new : true });
        res.status(200).json({user , message :"Profile Picture updated."});
        
    } catch (err) {
        res.status(422).json({ error: err.message });
        console.log(err);
    }

}
// remove Profile Pic
async function removeProfilePic(req, res) {
    try {
        const user = await USER.findByIdAndUpdate(req.user._id,{
            $set: { photo : 'https://res.cloudinary.com/dlaikb0id/image/upload/v1705229649/noProfile_cy0wyc.png' }
        },{ new : true });
        res.status(200).json({user , message :"Profile Picture removed."});
        
    } catch (err) {
        res.status(422).json({ error: err.message });
        console.log(err);
    }

}
// user data
async function userData(req, res) {
    try {
        const user = await USER.findById(req.body.userId);
        res.status(200).json(user);
        
    } catch (err) {
        res.status(422).json({ error: err.message });
        console.log(err);
    }

}




module.exports ={
    signup,
    login,
    uploadProfilePic,
    removeProfilePic,
    userData,
}
