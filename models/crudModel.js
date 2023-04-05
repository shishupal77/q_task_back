const mongoose = require("mongoose")

const crudSchema = new mongoose.Schema(
    {
       user_id:{
        type:String,
       },
        name: {
            type: String,
          },
        age: {
            type: String,
          },
        gender: {
            type: String,
          },
        address: {
            type: String,
          },
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("user", crudSchema);