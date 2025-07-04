const NotificationModel = require('../Models/notification');



exports.addNotification =async(req,res)=>{
    try{ 
        const{title} = req.body;
        const notification = new NotificationModel({title,addedBy:req.user._id});
        await notification.save();
        res.status(200).json({message:"notification Added Successfully",notification})
       

    }catch(err){
        console.log(err)
        res.status(500).json({
            error:"Something went Wrong",
            issue: err.message
        })
    }

}

exports.getNotifications = async(req,res)=>{
    try{
        const notifications = await NotificationModel.find().sort({createdAt:-1});
        return res.status(200).json({
            message:"Notifications fetched Successfully",
            notifications
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            error:"Something went Wrong",
            issue: err.message
        })
    }
}

exports.deleteNotificationById = async(req,res)=>{
    try{
        const {id} =req.params;
        const notification =await NotificationModel.findByIdAndDelete(id);
        if(notification){
            return res.status(200).json({
                message:"Notification Deleted",
            });
        }
    }catch(err){
        console.log(err)
        res.status(500).json({
            error:"Something went Wrong",
            issue: err.message
        })
    }
}