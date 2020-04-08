const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
    user_id:{
        type: String,
        required: true
    },
    bus_id:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    status:{
        type: Boolean,
        required:true
    },
    seatno:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Ticket', TicketSchema);