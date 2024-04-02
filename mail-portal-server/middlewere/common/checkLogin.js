const jwt = require("jsonwebtoken")

async function checkLogin(req , res , next) {
    const authHeader = req.headers.authorization;
   if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    
        try{
            const decodedData = jwt.verify(token , process.env.JWT_SECRET)
            req.user = decodedData;
            next();

          }catch(err){
            res.status(401).json({
                error :"invalid token",
                err
                });
        }

   }else(
    res.status(401).json({
        error:'missing token'
    })
   )
}

module.exports ={
    checkLogin,
}