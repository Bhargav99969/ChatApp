import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true,minlength:6 },
  confirm: { type: String, require: true },
  profilPic:{ type: String, default:"" },
},
{
    timestamp:true
}
)

const user = mongoose.model("user",UserSchema)
export default user;