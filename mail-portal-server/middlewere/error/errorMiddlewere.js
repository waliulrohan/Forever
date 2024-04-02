function notFoundHandler(req , res , next) {
    res.status(404).json({error:'Not found'})
}

function errorHandler(err , req , res , next) {
    res.status(500).json({error:err})
}

module.exports={
    notFoundHandler,
    errorHandler,
}