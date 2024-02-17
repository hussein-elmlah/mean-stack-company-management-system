import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../../databases/models/User.js';
import catchAsync from '../../../utilities/catchAsync.js';

const generateToken = (user) => {
  const tokenSecret = 'yourSecretKey'; // Replace with your actual secret key
  const expiresIn = '1h';

  return jwt.sign({ userId: user._id, username: user.username, role: user.role }, tokenSecret, { expiresIn });
};

const register = catchAsync(async(req, res,next) =>{
    const { username, password, firstName, email,lastName, dateOfBirth, address, jobLevel, mobileNumber, contract } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        password: hashedPassword,
        firstName,
        email,
        lastName,
        dateOfBirth,
        address,
        jobLevel,
        mobileNumber,
        contract,
      });
      res.status(201).json({message:"user registered successfully",newUser})
})
const login = async(req, res) =>{
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
const getUserProfile = async(req, res) =>{
  try {
    const userId = req.user.userId; // Extracted from the JWT
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

const updateUserProfile = async(req, res) =>{
  try {
    const userId = req.user.userId; // Extracted from the JWT
    const updatedFields = req.body; // Assuming all fields are updatable

    const user = await User.findByIdAndUpdate(userId, updatedFields, { new: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

function logout(req, res) {
  // You may implement additional logic for logout, such as invalidating tokens
  res.json({ message: 'Logout successful' });
}


export{
  register,
  login,
  getUserProfile,
  updateUserProfile,
  logout

}