//category schema
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      default: "https://images.pexels.com/photos/23733220/pexels-photo-23733220/free-photo-of-a-black-and-white-photo-of-a-person-walking-through-an-empty-building.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", CategorySchema);

export default Category;