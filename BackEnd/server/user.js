
require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const Slot =require('../models/slots')



const router = express.Router()

const User = require("../models/userlog");
const formdetails = require("../models/formdetails");
const jwt = require("jsonwebtoken");
var multer = require("multer");
var fs = require("fs");

router.post("/usersignup", async (req, res) => {
    console.log(req.body);
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        // console.log(newPassword);
        await new User({
            name: req.body.username,
            email: req.body.email,
            password: newPassword,
        }).save();
        console.log("done");
        res.json({ status: "ok" });
    } 
    
    catch (err) {
        console.log("err");
        console.log(err);
        res.json({ status: "error", error: "Duplicate email" });
    }
});

router.post('/save',async(req,res)=>{
    console.log("save");
    console.log(req.body);
    await new Slot({
        slot: req.body.slot,
        isBooked :req.body.isBooked,
        company :req.body.company
    }).save();
    res.status(200).json({message:"success"})
    console.log("done");
})

router.post("/login", async (req, res) => {
    console.log(req.body);

    try {  

        console.log('tryyyyy');
    
        const user = await User.findOne({
            email: req.body.email,

        });

        console.log('user', user);

        if (user) {
            const isPasswordValid = await bcrypt.compare(
                req.body.password,
                user.password
            );
            if (isPasswordValid) {
                console.log("valid password");
                const token = jwt.sign(
                    {
                        name: user.name,
                        email: user.email,
                    },
                    "secret123"
                );

                console.log("login success");
                res.json({ status: "ok", user: token });
            }
        }
        //   else{
        //     res.json({message:'no user'})
        //   }

    } catch(error) {
        console.log("err");
        console.log(error);
        return { status: "error", error: "Invalid login" };
    }
});

// app.get('/api/userhome', async (req, res) => {
// 	const token = req.headers['x-access-token']

// 	try {
// 		const decoded = jwt.verify(token, 'secret123')
// 		const email = decoded.email
// 		const user = await User.findOne({ email: email })

// 		return res.json({ status: 'ok', quote: user.quote })
// 	} catch (error) {
// 		console.log(error)
// 		res.json({ status: 'error', error: 'invalid token' })
// 	}
// })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./server/public/images");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post("/userhome", upload.single("file"), async (req, res) => {
    console.log(req.file);
    console.log(req.body);
    req.body.files = req.file.originalname;

    let formSubmit = new formdetails({
        name: req.body.name,
        email: req.body.email,
        city: req.body.city,
        company: req.body.company,
        address: req.body.address,
        state: req.body.state,
        phone: req.body.phone,
        logo: req.file.filename,
        team: req.body.team,
        products: req.body.products,
        solve: req.body.solve,
        solution: req.body.solution,
        proposition: req.body.proposition,
        competitors: req.body.competitors,
        revenue: req.body.revenue,
        potential: req.body.potential,
        services: req.body.services,
        incubation: req.body.incubation,
        proposal: req.body.proposal,
    });
    formSubmit
        .save()
        .then((data) => {
            console.log(data, "file submited");
            res.json(data);
        })
        .catch((error) => {
            console.log(error, "error is here");
            res.json(error);
        });

    //   const token = req.headers['x-access-token']

    //   try {
    //     const decoded = jwt.verify(token, 'secret123')
    //     const email = decoded.email
    //     await User.updateOne(
    //       { email: email },
    //       { $set: { quote: req.body.quote } }
    //     )

    //     return res.json({ status: 'ok' })
    //   } catch (error) {
    //     console.log(error)
    //     res.json({ status: 'error', error: 'invalid token' })
    //   }
});

module.exports = router;
