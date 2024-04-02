const EMAIL = require('../models/emailModel')
const USER = require('../models/userModel')

// send mail
async function sendMail(req , res) {
    try{
        const {to , subject , body , attachment} = req.body;
        if (!to || !subject || !body) {
            return res.status(500).json({ error: "Please fill all fields.", err })
        }else{
            const userTo = await USER.findOne({email : to});
            if (!userTo) {
                return res.status(500).json({ error: "Please enter valid email"})
            }else{
                const email = new EMAIL({
                    from : req.user._id,
                    to : userTo.id,
                    subject,
                    body,
                    attachment,
                })
                await email.save()
                res.status(200).json({message : 'Email sent.'})
            }
        }
    }catch(err){
        console.log(err)
        return res.status(500).json({ error: "Failure in sending mail!! Please try again", err })
    }
}

// my mails
async function myEmails(req , res) {
    try{
    const emails =  await  EMAIL.find({to : req.user._id , bin: false }).populate("to" , "_id name email photo").populate("from" , "_id name email photo").sort('-createdAt');
    res.status(200).json({emails})
    }catch(err){
        return res.status(500).json({ error: "Failure in fetching mails!! Pleaseeeee try again", err })
    }
}
// my bin mails

async function myBinEmails(req , res) {
    try{
    const emails =  await  EMAIL.find({to : req.user._id , bin: true }).populate("to" , "_id name email photo").populate("from" , "_id name email photo").sort('-createdAt');
    res.status(200).json({emails})
    }catch(err){
        return res.status(500).json({ error: "Failure in fetching mails!! Pleaseeeee try again", err })
    }
}
// bin mail
async function binEmail(req , res) {
    try{
    const email =  await  EMAIL.findOneAndUpdate({_id: req.body.emailId} ,{bin : true} )
    res.status(200).json({message : 'Mail moved to bin'})
    }catch(err){
        return res.status(500).json({ error: "Failure while transfering email to bin!! Pleaseeeee try again", err })
    }
}
// restore mail
async function restoreEmail(req , res) {
    try{
    const email =  await  EMAIL.findOneAndUpdate({_id: req.body.emailId} ,{bin : false} )
    res.status(200).json({message : 'Mail restored'})
    }catch(err){
        return res.status(500).json({ error: "Failure in restoring mail!! Pleaseeeee try again", err })
    }
}

// sent mails
async function sentEmails(req , res) {
    try{
    const emails =  await  EMAIL.find({from : req.user._id}).populate("to" , "_id name email photo").populate("from" , "_id name email photo").sort('-createdAt');
    res.status(200).json({emails})
    }catch(err){
        return res.status(500).json({ error: "Failure in fetching mails!! Pleaseeeee try again", err })
    }
}

// single mail
async function singleEmail(req , res) {
    try{
    const email =  await  EMAIL.find({_id : req.body.emailId}).populate("to" , "_id name email photo").populate("from" , "_id name email photo");
    res.status(200).json({email})
    }catch(err){
        return res.status(500).json({ error: "Failure in fetching mail!! Pleaseeeee try again", err })
    }
}
// starred mails
async function starredEmails(req , res) {
    try{
    const emails =  await  EMAIL.find({to : req.user._id , starred : true }).populate("to" , "_id name email photo").populate("from" , "_id name email photo").sort('-createdAt');
    res.status(200).json({emails})
    }catch(err){
        return res.status(500).json({ error: "Failure in fetching mails!! Pleaseeeee try again", err })
    }
}

// add star
async function addStar(req, res) {
    try {
        const email = await EMAIL.findByIdAndUpdate(req.body.emailId,{
            $set: { starred : true }
        },{ new : true }).populate("to" , "_id name email photo").populate("from" , "_id name email photo");
        res.status(200).json({email , message :"Email starred."});
        
    } catch (err) {
        res.status(422).json({ error: err.message });
        console.log(err);
    }

}
// remove star
async function removeStar(req, res) {
    try {
        const email = await EMAIL.findByIdAndUpdate(req.body.emailId,{
            $set: { starred : false }
        },{ new : true }).populate("to" , "_id name email photo").populate("from" , "_id name email photo");
        res.status(200).json({email , message :"Star removed."});
        
    } catch (err) {
        res.status(422).json({ error: err.message });
        console.log(err);
    }

}


// undoEmail
async function undoEmail(req , res) {
    try{
        const {emailId} = req.body;
        await EMAIL.deleteOne({_id : emailId})
        const result = await EMAIL.deleteOne({ _id: emailId });
        return res.status(200).json({ message: 'Email deleted.' });

    }catch(err){
        return res.status(500).json({ error: "Failure in deleting mail!! Pleaseeeee try again", err })
    }
}


module.exports = {
    sendMail,
    myEmails,
    sentEmails,
    undoEmail,
    singleEmail,
    myBinEmails,
    restoreEmail,
    binEmail,
    addStar,
    removeStar,
    starredEmails,

}