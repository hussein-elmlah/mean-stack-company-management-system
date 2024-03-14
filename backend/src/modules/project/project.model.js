import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    // _id: { type: mongoose.Schema.Types.ObjectId, required: true },
    client: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      fullName: { type: String },
      mobileNumber: { type: String },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    participatingDepartments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    ],
    hoursExpectedPerDepartment: { type: Map, of: Number },
    annex: {
      upper: { type: Boolean, default: false },
      land: { type: Boolean, default: false },
    },
    name: { type: String, required: true },
    number: { type: Number, required: true },
    location: { type: String },
    planNumber: { type: String },
    plotNumber: { type: String },
    landPerimeter: { type: Number },
    landArea: { type: Number },
    dateOfSubmission: { type: Date },
    type: { type: String },
    numberOfFloors: { type: Number },
    buildingArea: { type: Number },
    totalBuildingArea: { type: Number },
    hoursExpectedToComplete: { type: Number },
    expectedStartDate: { type: Date },
    expectedCompletionDate: { type: Date },
    actualCompletionDate: { type: Date },
    downloadLink: { type: String },
    projectPictures: [{ type: String }],
    description: { type: String },
  },
  {
    timestamps: true,
    runValidators: true,
  }
);

projectSchema.set("toJSON", {
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

projectSchema.pre("findOneAndUpdate", async function preUpdate(next) {
  try {
    this.options.runValidators = true;
    return next();
  } catch (error) {
    return next(error);
  }
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
