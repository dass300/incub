require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const slot =require('../models/slots')

const router = require("express").Router();
const { response } = require("express");
const formdetails = require("../models/formdetails");
 const register = require ('../models/adminlog')
 const jwt = require("jsonwebtoken");
var multer = require("multer");
var fs = require("fs");




router.post("/adminlogin", async (req, res) => {
    console.log(req.body);
    try {  
        console.log('tryyyyy');
        const admin = await register.findOne({
            email: req.body.email,
        });

        console.log('admin', admin);

        if (admin) {
            const isPasswordValid = await bcrypt.compare(
                req.body.password,
                admin.password
            );
            if (isPasswordValid) {
                console.log("valid password");
                const token = jwt.sign(
                    {
                        name: admin.name,
                        email: admin.email,
                    },
                    "secret123"
                );
                console.log("admin login success");

                res.json({ status: "ok", admin: token });
            }
        }
          else{
            res.json({message:'no user'})
          }

    } catch(error) {
        console.log("err");
        console.log(error);
        return { status: "error", error: "Invalid login" };
    }
});



router.get('/getRegistration',async(req,res)=>{
    try {
        console.log("server");
        let data =await formdetails.find({status:"Pending"})
        console.log("NEW RECORD");
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.log("err");
    }
})

router.get('/applicationList',async(req,res)=>{
    try {
        console.log("server");
        let data =await formdetails.find()
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        console.log("err");
    }
})

router.get('/decline_list',async(req,res)=>{
    try {
        console.log("server");
        let data =await formdetails.find({status:"Decline"})
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.log("err");
    }
})

router.get('/getSlot',async(req,res)=>{
    console.log("cvbnm,");
    try {
        console.log("slot");
        let data =await slot.find()
        console.log("data");
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        console.log("err");
    }
})

router.post('/getDetail',async(req,res)=>{
try {
    let data = await formdetails.findOne({_id:req.body.id})
    console.log(req.body.id);
    console.log("pop");
    console.log(data);
    res.status(200).json(data)
} catch (error) {
   console.log(error); 
}
})

router.post('/approved',async(req,res)=>{
    try {
        let data = await formdetails.findByIdAndUpdate({_id:req.body.id},{status:"Approved"})
        res.status(200).json(data)
    } catch (error) {
       console.log(error); 
    }
    })


    router.post('/decline',async(req,res)=>{
        try {
            let data = await formdetails.findByIdAndUpdate({_id:req.body.id},{status:"Decline"})
            res.status(200).json(data)
        } catch (error) {
           console.log(error); 
        }
        })

    router.get('/slotUpdate',async(req,res)=>{
        console.log("req.query.slotId");
        console.log(req.query.slotId);
        console.log(req.query.company);
        let update = await formdetails.findOneAndUpdate({company_name:req.query.company},{status:"Booked"})
        if(update){
        let data =await slot.findByIdAndUpdate({_id:req.query.slotId},{
            isBooked:true,
            company:req.query.company
        })
        res.status(200).json(data)
    }else{
        console.log("Error");
    }
        })

    router.get('/progerss',async(req,res)=>{
        let data =  await formdetails.find()
        res.status(200).json(data)
    })



        router.post('/save',(req,res)=>{
            console.log("postman");
            console.log(req.body);
            new slot({
                slot:req.body.slot,
                isBooked:req.body.isBooked,
                company:req.body.company,
                userId:req.body.userId,
            }).save()
            res.status(200).send("success")
        })


       

module.exports = router