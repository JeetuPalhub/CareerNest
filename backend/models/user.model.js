import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String, // IMPORTANT: use string, not number
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false, // Do not fetch by default
    },

    role: {
      type: String,
      required: true,
      enum: ["student", "recruiter", "admin"], // Updated roles
      default: "student",
    },

    profile: {
      bio: {
        type: String,
        default: "",
        trim: true,
      },

      skills: {
        type: [String],
        default: [],
      },

      resume: {
        type: String,
        default: "",
      }, // Stored path or URL

      resumeOriginalName: {
        type: String,
        default: "",
      },

      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        default: null,
      },

      profilePhoto: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create index for faster login searches
userSchema.index({ email: 1 });

export const User = mongoose.model("User", userSchema);
