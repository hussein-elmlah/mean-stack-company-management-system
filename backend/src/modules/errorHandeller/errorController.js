import AppError from "../../../utilities/errorHandling.js";

const handleValidationErrorDB = err => {
  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

export default (err,req,res,next) => {

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'Internal Server Error..'
  let error = { ...err };
    if (err.name === 'ValidationError')
      error = handleValidationErrorDB(error);
 if(error.isOperational){
      res.status(error.statusCode).json({
        status: error.status,
        message:error.message
      })
  }
  else{
    // console.error('ERROR 😢',err)
    res.status(500).json({
      status: 'error',
      message: 'Something wrong! Please try again'
    })
  }
}