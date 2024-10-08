import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const ShippingSchema = new Schema(
  {
    order: { type: Schema.Types.ObjectId, ref: "SubOrder" },
    vendor: { type: Schema.Types.ObjectId, ref: "Vendor", required: true },
    orderId: { type: String, required: true },
    shipmentId: { type: String, required: true },
    shippingAddress: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    trackingId: { type: String, },
    carrier: { type: String },
    label: { type: String },
    trackingUrl: { type: String },
    
    status: {
      type: String,
      default: "pending",
    },
    shippedAt: Date,
    deliveredAt: Date,
    returnedAt: Date,
  },
  { timestamps: true }
);

ShippingSchema.pre("find", function () {
  this.sort({ _id: -1 });
});

