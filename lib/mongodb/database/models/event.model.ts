import { model, models, Schema, Document, Model } from "mongoose";

export interface IEvents extends Document {
  title: string;
  description?: string;
  location?: string;
  createdAt: Date;
  imageUrl: string;
  startTimeDate: Date;
  endTimeDate: Date;
  price?: string;
  isFree: boolean;
  url?: string;
  category: { _id: string; name: string };
  organizer: { _id: string; firstName: string; lastName: string };
}

const EventSchema = new Schema<IEvents>({
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now },
  imageUrl: { type: String, required: true },
  startTimeDate: { type: Date, default: Date.now },
  endTimeDate: { type: Date, default: Date.now },
  price: { type: String },
  isFree: { type: Boolean, default: false },
  url: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Event: Model<IEvents> =
  models.Event || model<IEvents>("Event", EventSchema);

export default Event;
