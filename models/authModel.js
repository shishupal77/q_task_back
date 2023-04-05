const mongoose = require("mongoose")

const authSchema = new mongoose.Schema(
    {
          email: {
            type: String,
            required: true,
            unique: true,
          },
          password: {
            type: String,
          },
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("Auth", authSchema);