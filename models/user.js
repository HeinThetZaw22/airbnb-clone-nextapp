import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoriteIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Listing',
  }],
  
});

const User = models?.User || model("User", userSchema);
export default User;
