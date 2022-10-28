const mongoose = require("mongoose");

const formdetails = new mongoose.Schema(
  {
    name: {
         type: String, 
         required: true 
        },
        email: {
         type: String, 
         required: true 
        },
        city: {
         type: String, 
         required: true 
        },
        company: {
         type: String, 
         required: true 
        },
        address: {
         type: String, 
         required: true 
        },
        state: {
         type: String, 
         required: true 
        },
        phone: {
         type: String, 
         required: true 
        },
        logo: {
         type: String, 
         required: true 
        },
        team: {
         type: String, 
         required: true 
        },
        products: {
         type: String, 
         required: true 
        },
        solve: {
         type: String, 
         required: true 
        },
        solution: {
         type: String, 
         required: true 
        },
        proposition: {
         type: String, 
         required: true 
        },
        competitors: {
         type: String, 
         required: true 
        },
    
        revenue: {
         type: String, 
         required: true 
        },
    
        potential: {
         type: String, 
         required: true 
        },
    
        services: {
         type: String, 
         required: true 
        },
        incubation: {
         type: String, 
         required: true 
        },
        proposal: {
         type: String, 
         required: true 
        },
        status: {
          type: String, 
          default:"Pending"
         },
    
  },{timestamps:true},

);

const forminput = mongoose.model("form", formdetails);

module.exports = forminput; 

