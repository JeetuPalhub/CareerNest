import mongoose from "mongoose";
import slugify from "slugify";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
    },

    requirements: {
      type: [String],
      default: [],
    },

    salary: {
      type: Number,
      required: true,
      min: 1,
    },

    experienceLevel: {
      type: String,
      required: true,
      enum: ["fresher", "junior", "mid", "senior", "lead"],
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    jobType: {
      type: String,
      required: true,
      enum: ["full-time", "part-time", "internship", "remote", "contract"],
    },

    position: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
      index: true,
    },

    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],

    slug: {
      type: String,
      index: true,
    },
  },
  { timestamps: true }
);

// Create slug from title
jobSchema.pre("save", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true });
  }
  next();
});

// Text index for search
jobSchema.index({
  title: "text",
  description: "text",
  location: "text",
});

export const Job = mongoose.model("Job", jobSchema);
