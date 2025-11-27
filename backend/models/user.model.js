import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Full name must be at least 3 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    phoneNumber: {
      type: String, // keep as string for leading zeros + country codes
      required: [true, "Phone number is required"],
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false, // prevent leaking password
    },

    role: {
      type: String,
      enum: ["student", "recruiter", "admin"],
      default: "student",
      required: true,
    },

    profile: {
      bio: {
        type: String,
        trim: true,
        default: "",
      },

      skills: {
        type: [String],
        default: [],
      },

      resume: {
        type: String, // file path or URL
        default: "",
      },

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

// 🛠 FIX DUPLICATE INDEX WARNING (MongoDB throws warning without this)
userSchema.index({ email: 1 }, { unique: true });

export const User = mongoose.model("User", userSchema);
