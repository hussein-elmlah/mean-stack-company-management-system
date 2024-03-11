import jsonwebtoken from 'jsonwebtoken';

// const { JWT_SECRET, JWT_SECRET_ADMIN } = process.env;

export const generateTokenUser = (user) => {
  try {
    if (!user || !user.username || !user._id || !user.role) {
      return new Error('Invalid user object.');
    }

    if (!process.env.JWT_SECRET) {
      return new Error('JWT secret is not defined.');
    }

    const token = jsonwebtoken.sign(
      { username: user.username, id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' },
    );
    return token;
  } catch (error) {
    console.error('Error generating JWT token:', error.message);
    throw error;
  }
};

// export const generateTokenAdmin = (admin) => {
//   try {
//     if (!admin || !admin.username || !admin._id || admin.role) {
//       return new Error('Invalid admin object.');
//     }

//     if (!JWT_SECRET_ADMIN) {
//       return new Error('JWT admin secret is not defined.');
//     }

//     const token = jwt.sign(
//       { username: admin.username, id: admin._id, role: admin.role },
//       JWT_SECRET_ADMIN,
//       { expiresIn: '7d' },
//     );

//     return token;
//   } catch (error) {
//     console.error('Error generating JWT token:', error.message);
//     throw error;
//   }
// };
