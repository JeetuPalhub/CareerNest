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

    // FIXED: Experience should be a number, based on your controller
    experienceLevel: {
      type: Number,
      required: true,
      min: 0,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    // FIXED: job types should match your frontend values
    jobType: {
      type: String,
      required: true,
      enum: ["Full-time", "Part-time", "Internship", "Remote", "Contract"],
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

// --------------------------------------
// 🔥 Improved slug generator
// --------------------------------------
jobSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// --------------------------------------
// 🔥 Text index for powerful search
// --------------------------------------
jobSchema.index({
  title: "text",
  description: "text",
  location: "text",
});

export const Job = mongoose.model("Job", jobSchema);
