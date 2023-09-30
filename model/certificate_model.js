import mongoose from "mongoose";

const CertificateSchema = new mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    enTitle: {
      type: String,
      required: [true, "title is required"],
      unique: [true, "Must be unique"],
    },
    arTitle: {
      type: String,
      required: [true, "title is required"],
      unique: [true, "Must be unique"],
    },
    krTitle: {
      type: String,
      required: [true, "title is required"],
      unique: [true, "Must be unique"],
    },
    enDesc: {
      type: String,
      required: [true, "type is required"],
    },
    arDesc: {
      type: String,
      required: [true, "type is required"],
    },
    krDesc: {
      type: String,
      required: [true, "type is required"],
    },

    url: {
      type: String,
      default: "",
    },
    stacks: [
      {
        stack: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "stack",
        },
      },
    ],

    types: [
      {
        type: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "type",
        },
      },
    ],

    imageName: {
      type: String,
      required: [true, "imageName is required"],
    },
    imageURL: {
      type: String,
      required: [true, "imageURL is required"],
    },
    date: {
      type: Date,
      required: [true, "date is required"],
    },
  },
  { timestamps: true }
);

const Certificate = new mongoose.model("certificate", CertificateSchema);

export default Certificate;
