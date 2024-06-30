import mongoose, { model, models, Schema, Types } from "mongoose";

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  location: { 
    value: { type: String },
    label: { type: String},
    flag: { type: String },
    latlng: { type: [Number]},
    region: { type: String }
  },
  guestCount: {
    type: Number,
    required: true,
  },
  roomCount: {
    type: Number,
    required: true,
  },
  bathroomCount: {
    type: Number,
    required: true,
  },
  imageSrc: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
  },
  user: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    }
  },
  favoriteIds: [String],
}, {timestamps : true});

const Listing = models?.Listing || model("Listing", listingSchema);
export default Listing;
