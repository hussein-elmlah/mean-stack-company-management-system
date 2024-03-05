import CustomError from '../lib/customError.js';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomError || err.status) {
    res.status(err.status || 500).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
  console.log(err);
};

export default errorHandler;