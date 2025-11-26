import mongoose from "mongoose";
import slugify from "slugify";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },

    website: {
      type: String,
      default: "",
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    logo: {
      type: String,
      default: "",
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    slug: {
      type: String,
      unique: false,
    },
  },
  { timestamps: true }
);

// Generate slug on create/update
companySchema.pre("save", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true });
  }
  next();
});

// Indexes for faster queries
companySchema.index({ name: "text", description: "text" });
companySchema.index({ slug: 1 });

export const Company = mongoose.model("Company", companySchema);
