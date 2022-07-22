
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//@desc           Register a user
//@route          POST /api/users/
//@access         Public

exports.register = asyncHandler(async (req, res, next) => {

        let {name, email, password} = req.body;

        if (!name || !email || !password) {
            res.status(400)
            throw new Error("Please include all fields!")
        };

        //Check User
        let userExists = await User.findOne({email: email});

        if (userExists) {
            res.status(400)
            throw new Error("This user already exists!")
        };

        //Hash Password

        let salt = await bcrypt.genSalt(10);

        let hashPassword = await bcrypt.hash(password, salt);

        //Add to database

        let user = await User.create({
            name: name,
            email: email,
            password: hashPassword
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error("Invalid User Data")
        }

    
});


//@desc           Log In
//@route          POST    /api/users/login
//@access         Public

exports.login = asyncHandler(async (req, res, next) => {

    let {email, password} = req.body;

    let user = await User.findOne({email: email});

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid Credentials");
    }
});

const generateToken = (id) => {
    return jwt.sign({ id: id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
};

exports.getMe = asyncHandler(async (req, res, next) => {

    let fields = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email
    };

    res.status(200).json(fields);
})


















































// const asyncHandler = require("express-async-handler");
// const User = require("../models/userModel");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// //@desc     Register a user
// //@route    POST    /api/user/
// //@access   Public

// exports.register = asyncHandler(async (req, res, next) => {

//     let {name, email, password} = req.body;

//     // Check all fields
//     if (!name || !email || !password) {
//         res.status(400)
//         throw new Error("Please fill all fields!")
//     };

//     // Check User
//     let userExists = await User.findOne({ email: email});

//     if (userExists) {
//         res.status(400)
//         throw new Error("This user exists already")
//     };

//     //Hash password

//     let salt = await bcrypt.genSalt(10);
//     let hashedPassword = await bcrypt.hash(password, salt);

//     // Add to database

//     let user = await User.create({
//         name: name,
//         email: email,
//         password: hashedPassword
//     });

//     if (user) {
//         res.status(201).json({
//             _id: user._id,
//             name: user.name,
//             email: user.email,
//             token: generateToken(user._id)
//         })
//     } else {
//         res.status(400)
//         throw new Error("Invalid User Data")
//     }


// });


// exports.login = asyncHandler(async (req, res, next) => {

//     let {email, password} = req.body;

//     let user = await User.findOne({ email: email});

//     if (user && (await bcrypt.compare(password, user.password))) {
//         res.status(200).json({
//             success: true,
//             name: user.name,
//             email: user.email,
//             token: generateToken(user._id)
//         })
//     } else {
//         res.status(401)
//         throw new Error("Invalid Credentials");
//     }


// });

// const generateToken = (id) => {
//     return jwt.sign({ id: id}, process.env.JWT_SECRET, {
//         expiresIn: process.env.JWT_EXPIRE
//     })
// };