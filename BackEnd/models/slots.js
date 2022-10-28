const mongoose=require ('mongoose')

    const Slots = new mongoose.Schema({
        slot: { type: Number, },
        isBooked: { type: Boolean, },
        company: { type: String, },
        // userId: { type: String, }
    },

)
const slot = mongoose.model('slot',Slots)
module.exports=slot   