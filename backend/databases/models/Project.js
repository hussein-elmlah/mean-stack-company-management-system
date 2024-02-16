import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  client: {
    fullName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
  },
  owner: { type: String, required: true },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming there's a User model for senders
    required: true,
  },
  dateOfSubmission: { type: Date, required: true },
  type: { type: String, required: true },
  participatingDepartments: [{ type: String }],
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
  workingDepartments: [{ type: String }],
  hoursExpectedPerDepartment: { type: Map, of: Number },
  downloadLink: { type: String },
  projectPictures: [{ type: String }],
  description: { type: String },
},{timestamp:true});

const Project = mongoose.model('Project', projectSchema);

export default Project;
