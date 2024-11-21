const checkUserPresent =(req,res,next)=>{
    const {user} =req.session;
    if(!user){
        return res.status(401).clearCookie("connect.sid").json({status:"fail",message:"unauthorised"});
    }
    console.log(user)
    req.user= user;
    next();
}

module.exports= checkUserPresent;