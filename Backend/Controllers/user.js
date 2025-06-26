const UserModels= require('../Models/user');
const bcryptjs = require("bcryptjs");
const jwt=require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const cookieOptions={
    httpOnly: true,
    secure:false,
    sameSite: 'Lax'
};

const  transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD // Your email password or app password
    }
});

 exports.register = async (req, res) => {
    try{
        const{ name, email, password,roll} = req.body;
        const isExist = await UserModels.findOne({  email });
        if(isExist){

            return res.status(400).json({ error: 'User already exists eith this email or roll' });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);

        const user = new UserModels({
            name,
            email,
            roll,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ message: 'User registered successfully',success:"yes",data: user });



    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Something went wrong',issue:err.message });

    }
 };



 exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;
        const isExist = await UserModels.findOne({  email });


        if(isExist && await bcryptjs.compare(password,isExist.password)){

          const token=jwt.sign({userId:isExist._id}, "Its_my_Secret_Key");

          res.cookie('token',token, cookieOptions);

          return  res.status(200).json({ message: 'Login successful', success: "true", user: isExist,token });

        }else{
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        

    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Something went wrong', issue: err.message });

    }
 }


 exports.sendOtp = async (req, res) => {
    try{

        const { email } = req.body;
        const user = await UserModels.findOne({  email });
        if(!user){
            return res.status(400).json({ error: 'User not found' });
        }
        const buffer = crypto.randomBytes(4);
        const token=buffer.readUInt32BE(0) % 900000+100000;// module to get 6 digit number

        user.resetPasswordToken=token;
        user.resetPasswordExpires=new Date(Date.now() + 3600000); // 1 hours

        await user.save();

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset. Your OTP is: ${token} `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({ error: 'Server Error',errorMsg:error });
            }else{
                res.status(200).json({ message: 'OTP sent to your email' })
            }
        });

    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Something went wrong', issue: err.message });

    }

 }

 exports.verifyOtp = async (req, res) => {
    try {
        const { otp, email } = req.body;

        // ✅ Convert OTP to number
        const numericOtp = Number(otp);

        // 🧪 Optional debug logs to trace values
        console.log("Received Email:", email);
        console.log("Received OTP:", otp);
        console.log("Converted OTP (Number):", numericOtp);
        console.log("Current Timestamp:", Date.now());

        const user = await UserModels.findOne({
            email,
            resetPasswordToken: numericOtp,  // ✅ Match number to number
            resetPasswordExpires: { $gt: Date.now() } // ✅ Ensure not expired
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid or expired OTP' });
        }

        return res.status(200).json({ message: 'OTP verified successfully' });

    } catch (err) {
        console.error("Error verifying OTP:", err);
        return res.status(500).json({ error: 'Something went wrong', issue: err.message });
    }
};


exports.resetPassword=async(req,res)=>{
    try{
        const{email,newPassword}=req.body;

        const user=await UserModels.findOne({email});
        if(!user){
            return res.status(400).json({error:"Some Technical Issus,please try again later"});
        }
        let updatedPassword = await bcryptjs.hash(newPassword,10);
        user.password = updatedPassword;
        user.resetPasswordExpires = undefined;
        user.resetPasswordToken  = undefined;

        await user.save();
        res.status(200).json({message:"Password Reset Successfully"});


    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Something went wrong', issue: err.message });

    }
};

exports.updateStudentById= async(req,res)=>{
    try{

        const {id}=req.params;
        const updateStudent =await UserModels.findByIdAndUpdate(id,req.body,{new:true});

        if(updateStudent){
            return res.status(200).json({message:"Staff Update Successfully"});
        }
        return res.status(400).json({error:"No Such Student is there"})


    }catch(err){
        console.log(err)
        res.status(500).json({
            error:"Something Went Wrong",
            issue:err.message
        })

    }
}

exports.getStudentByRollNo=async(req,res)=>{
    try{
        const{roll}=req.params;
        const student=await UserModels.findOne({roll});

        if(student){
            return res.status(200).json({message:"Student fetched Successfully",student});
        }
        return res.status(400).json({error:"No Such Student is there"})

    }catch{
        console.log(err)
        res.status(500).json({
            error:"Something Went Wrong",
            issue:err.message
        })

    }


}

exports.registerStudentByStaff= async(req,res)=>{
    try{

        const buffer=crypto.randomBytes(4); // Get Random bytes
        let token = buffer.readUInt32BE(0) % 900000 + 100000; // Modulo to get a 6-digit number
        let {_id,...body }=req.body;
        const isExist = await UserModels.findOne({email:body.email});
        if(isExist){
            return res.status(400).json({error:"Already have an account with this email"});
        }
        token= token.toString();
        let updatedPass = await bcryptjs.hash(token,10);

        const user=new UserModels({...body,password:updatedPass});
        await user.save();

        const mailOptions = {
            from: process.env.EMAIL,
            to: body.email,
            subject: 'Password for dispensary System ',
            text: `Hi,You Password for Dispensary System is ${token} whose email id is registered email id ${body.email} `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
               return res.status(500).json({ error: 'Server Error',errorMsg:error });
            }else{
                return res.status(200).json({ message: 'Password sent to your student email id' })
            }
        });


    }catch{
        console.log(err)
        res.status(500).json({
            error:"Something Went Wrong",
            issue:err.message
        })
    }

}

exports.addStaffsByAdmin= async(req,res)=>{
    try{
        const {name,email,password,designation,mobileNo} =req.body;
        const searchStaff=await UserModels.findOne({email});
        if(searchStaff){
            return res.status(400).json({error:"Already have an account with this email id."});
        }

        let updatedPass= await bcryptjs.hash(password,10);
        const user=new UserModels({name,email,designation,mobileNo,password:updatedPass,role:"staff"});
        await user.save();

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Password for dispensary System',
            text: `Hi,You Password for Dispensary System is ${password} whose email id is registered email id ${email} for staff Portal `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.status(500).json({ error: 'Server Error',errorMsg:error });
            }else{
                res.status(200).json({ message: 'Password sent to your staffs email id' })
            }
        });



    }catch{
         console.log(err)
        res.status(500).json({
            error:"Something Went Wrong",
            issue:err.message
        })

    }
}

exports.getAllStaffs=async(req,res)=>{
    try{
        const staffs=await UserModels.find({role:"staff"});
        return res.status(200).json({
            staffs
        })


    }catch{
        console.log(err)
        res.status(500).json({
            error:"Something Went Wrong",
            issue:err.message
        })

    }

}

exports.updateStaffById=async(req,res)=>{
    try{
        const {id}=req.params;
        const{name,designation,mobileNo} =req.body;
        const staff=await UserModels.findById(id);

        if(staff){
            staff.name=name;
            staff.designation=designation;
            staff.mobileNo=mobileNo;
            await staff.save();
            return res.status(200).json({message:"Successfully Updated"});





        }else{
            return res.status(400).json({error:"No Such Staff Exist"});

        }

    }catch{
        console.log(err)
        res.status(500).json({
            error:"Something Went Wrong",
            issue:err.message
        })

    }
}

exports.deleteStaff=async(req,res)=>{
    try{
        const {id}=req.params;
        const deleteUser=await UserModels.findByIdAndDelete(id);

        if(deleteduser){
            return res.status(200).json({message:"Staff getting Deleted"});
        }
        return res.status(400).json(400).json({error:"No Such Staff is there"})


    }catch{
         console.log(err)
        res.status(500).json({
            error:"Something Went Wrong",
            issue:err.message
        })

    }

}

exports.logout = async (req, res) => {
  console.log("Cookies received:", req.cookies); // 👉 Debug

  res.clearCookie('token', cookieOptions);
  return res.status(200).json({ message: "Logged out successfully" });
};

