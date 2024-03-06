import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Add project name field
    number: { type: String, required: true, unique: true }, // Add unique project number field
    client: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      fullName: { type: String },
      mobileNumber: { type: String },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dateOfSubmission: { type: Date },
    type: { type: String },
    participatingDepartments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
    numberOfFloors: { type: Number },
    landArea: { type: Number },
    buildingArea: { type: Number },
    totalBuildingArea: { type: Number },
    annex: {
      upper: { type: Boolean, default: false },
      land: { type: Boolean, default: false },
    },
    hoursExpectedToComplete: { type: Number },
    expectedCompletionDate: { type: Date },
    actualCompletionDate: { type: Date },
    workingDepartments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Department' }],
    hoursExpectedPerDepartment: { type: Map, of: Number },
    downloadLink: { type: String },
    projectPictures: [{ type: String }],
    description: { type: String },
  },
  { timestamps: true },
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
