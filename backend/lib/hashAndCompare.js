import bcrypt from 'bcrypt';

const hashFunction = ({ plainText, saltRounds = process.env.rounds } = {}) => {
  const hash = bcrypt.hash(plainText, saltRounds);
  return hash;
};

const compareFunction = ({ plainText, hash } = {}) => {
  const compare = bcrypt.compare(plainText, hash);
  return compare;
};

exports = { hashFunction, compareFunction };
