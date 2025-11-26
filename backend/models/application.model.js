import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
      index: true,
    },

    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Application status workflow
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },

    // Optional: cover letter
    coverLetter: {
      type: String,
      trim: true,
      default: "",
    },

    // Resume (file upload)
    resume: {
      type: String, 
      default: "", // stored file path
    },

    resumeOriginalName: {
      type: String,
      default: "",
    },

    // Recruiter notes
    recruiterNotes: {
      type: String,
      trim: true,
      default: "",
    },

    // Snapshot of applicant details at application time
    applicantSnapshot: {
      fullname: { type: String },
      email: { type: String },
    },
  },
  { timestamps: true }
);

// Unique constraint to prevent double apply (DB-level safety)
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

export const Application = mongoose.model("Application", applicationSchema);
