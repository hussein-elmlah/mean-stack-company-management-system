const catchAsync =  fn =>{
    return async (req,res,next) =>{
      try{
        await fn(req,res,next)
      }
      catch (error) {
    // next(new AppError(error.message,415))
    next(error)
  }
    }
}


export default catchAsync