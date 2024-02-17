import mongoose from 'mongoose';
import validator from 'validator';
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: [true, 'username is required! 😒'],
 validate: {
        validator: async function (value) {
          const existingUser = await this.constructor.findOne({ username: value });
          return !existingUser;
        },
        message: 'Please enter another username',
      },
},
  password: { type: String, required: [true, 'password is required ! 😒'] },
  role: { type: String, enum: ['client', 'junior', 'senior', 'branchManager', 'companyOwner'], required: true,
default: 'client'
},
  firstName: { type: String, required: [true, 'firstName is required! 😒']   },
  lastName: { type: String, required: [true, 'lastName is required! 😒']   },
  dateOfBirth: { type: Date },
  address: { type: String },
  jobLevel: { type: String },
  mobileNumber: { type: String,
  validate: [validator.isMobilePhone,'Please, Enter a valid phone number' ],
  require: [true, 'mobile number is reuired! 😒']
},
email:{
  type:String,
  validate: [validator.isEmail, 'Please enter valid email 😑'],
  required: [true,'Please Enter email']
},
  contract: {
    number: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    salary: { type: Number },
  },
},{timestamp:true});

const User = mongoose.model('User', userSchema);

export default User;
