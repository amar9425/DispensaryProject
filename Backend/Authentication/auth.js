const jwt = require('jsonwebtoken');
const UserModel = require('../Models/user');


exports.studentAuth = async (req, res, next) => {
    try{
        const token=req.cookies.token;
        if(token){
            const decode = jwt.verify(token, "Its_my_Secret_Key");
            req.user = await UserModel.findById(decode.userId).select("-password");
            next();


        }else{
            return res.status(401).json({error:'No token, authorization denied'});
        }

    }catch(err){
        res.status(401).json({error:'Something went wrong in Authentication'});
    }
}





 exports.adminFacultyAuth = async (req, res, next) => {
     try {
         let token;

       if (req.cookies?.token) {
             token = req.cookies.token;
         } else if (req.headers.authorization?.startsWith("Bearer ")) {
             token = req.headers.authorization.split(" ")[1];
         }

        if (!token) {
             return res.status(401).json({ error: 'No token, authorization denied' });
         }

         const decode = jwt.verify(token, "Its_my_Secret_Key");
       req.user = await UserModel.findById(decode.userId).select("-password");

        if (req?.user?.role === 'student') {
             throw new Error('You don’t have access to this page');
         }

         next();

        } catch (err) {
         console.log(" Auth Error:", err.message);
         res.status(401).json({ error: 'Something went wrong in Authentication', details: err.message });
        }
    
};
