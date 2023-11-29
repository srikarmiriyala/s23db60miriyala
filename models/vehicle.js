const mongoose = require("mongoose")
const vehicleSchema = mongoose.Schema({
vehicle_type: String,
vehicle_color: String,
vehicle_price: { type: Number,
    min: 5000,
    max: 56000
  }
})
module.exports = mongoose.model("vehicle",
vehicleSchema)