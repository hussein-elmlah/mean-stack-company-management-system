import bcrypt from 'bcrypt';

export const hashFunction = async ({ plainText, saltRounds = process.env.rounds } = {}) => {
  try {
    const hash = await bcrypt.hash(plainText, +saltRounds);
    return hash;
  } catch (error) {
    throw new Error(error);
  }
};

export const compareFunction = async (plainText, hash) => {
  const compare = await bcrypt.compare(plainText, hash);
  return compare;
};
