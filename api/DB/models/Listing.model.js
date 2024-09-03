import mongoose, { Schema, model, Types } from "mongoose";

const ListingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    status:{
      type: String,
      default: 'active',
      enum: ['active', 'deactivated']
  },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    type:{
      type: String,
        default: 'sale',
        enum: ['sale', 'rent'],
        required: true,
    },
    userRef: {
      type: Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const listingModel = model("Listing", ListingSchema) || mongoose.model.Listing;

export default listingModel;
