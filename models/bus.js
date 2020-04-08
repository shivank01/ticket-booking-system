const mongoose = require('mongoose');

const BusSchema = mongoose.Schema({
    numberOfSeats:{
        type: Number,
        default: 40
    },
    Seats:{
        type: Array,
        required: true
    },
    start_time:{
        type: Date,
        required: true
    },
    end_time:{
        type: Date,
        required: true
    },
    start_station:{
        type: String,
        required: true
    },
    end_station:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Bus', BusSchema);