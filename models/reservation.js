import { model, models, Schema } from "mongoose";

const reservationSchema = new Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  listingId: {
    type: Schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true, // Automatically manage `createdAt` and `updatedAt` fields
});

const Reservation = models?.Reservation || model("Reservation", reservationSchema);
export default Reservation;
