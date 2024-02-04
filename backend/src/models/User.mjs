import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['client', 'junior', 'senior', 'branchManager', 'companyOwner'], required: true },
  fullName: { type: String },
  dateOfBirth: { type: Date },
  address: { type: String },
  jobLevel: { type: String },
  mobileNumber: { type: String },
  contract: {
    number: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    salary: { type: Number },
  },
});

const User = mongoose.model('User', userSchema);

export default User;
