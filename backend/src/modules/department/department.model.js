import mongoose from 'mongoose';
import validator from 'validator';

export const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      async validator(value) {
        const existingDept = await this.constructor.findOne({
          name: value,
        });
        return !existingDept;
      },
      message: "Please choose another department name  🤨",
    },
  },
});

const Department = mongoose.model('Department', departmentSchema);
export default Department;
