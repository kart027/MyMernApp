const jwt = require("jsonwebtoken");
const JWT_secert = "kartikg@2002"



const fetchuser = (req,res,next)=>{
    // get user from the jwt token and add id to req object
    
    const token = req.header('auth-token');

    if(!token){
        return res.status(401).send({error:"please enter valid token"});
    }
    try {
        const data= jwt.verify(token,JWT_secert);
            req.user = data.user;

        
    } catch (error) {
        res.send(error)
    }
    next();

}

module.exports = fetchuser;