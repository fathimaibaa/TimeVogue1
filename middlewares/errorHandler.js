

const notFound = (req,res,next)=>{

    const error = new Error (`not Found : ${req.originalUrl}`)
   res.status(404)
    next(error);

}



const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    
    res.status(statusCode);
    
    if (statusCode === 500) {
        return res.render('./shop/pages/error');
    }
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
};

module.exports = { notFound, errorHandler };
