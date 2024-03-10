import bcrypt from 'bcrypt';

export const hashFunction = async ({ plainText, saltRounds = process.env.rounds } = {}) => {
  try {
    const hash = await bcrypt.hash(plainText, saltRounds);
    return hash;
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

export const compareFunction = ({ plainText, hash } = {}) => {
  const compare = bcrypt.compare(plainText, hash);
  return compare;
};
