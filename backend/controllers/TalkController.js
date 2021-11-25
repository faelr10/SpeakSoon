const Talk = require('../models/Talk')
const User = require('../models/User')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')



module.exports = class TalkController {

    static async newTalk(req, res) {

       
        // const idTalk = JSON.stringify(user1._id)
        const idTalk = req.params.id

        const verifyTalk = await Talk.findOne({idTalk:idTalk})

        if(verifyTalk){
            res.status(200).json({ message: "Redirecionando para conversa" })
        }else{
            const talk = new Talk({
                idTalk
            })
    
            try {
                await talk.save()
                res.status(200).json({ message: "New Talk" })
    
            } catch (error) {
                res.status(500).json({ message: error })
                return
            }
        }

        

    }

    static async newMessage(req, res) {

        const {message,idUser} = req.body
        const idTalk = req.params.id
        const talk = await Talk.findOne({ idTalk: idTalk })
        const msg = [message,idUser]

        if(!message){
            res.status(422).json({ message: 'Preencha o campo mensagem' })
            return
        }

        if(!idUser){
            res.status(422).json({ message: 'Preencha o campo idUser' })
            return
        }

        if (!talk) {
            res.status(422).json({ message: idTalk })
            return
        }

        try {
            // returns updated data
            const newMessage = await Talk.findOneAndUpdate(
                { idTalk: idTalk},
                { $push: {messages: [msg]} },
                { new: true },
            )
            res.json({
                message: 'nova mensagem atualizada com sucesso!',
                data: newMessage,
            })
        } catch (error) {
            res.status(500).json({ message: error })
        }

    }

    static async showMessage(req,res){

        const idTalk = req.params.id
        const talk = await Talk.findOne({ idTalk: idTalk })

        const token = getToken(req)
        const user = await getUserByToken(token)

        const allMsg = talk.messages
        const userId = user.name
        const userImage = user.image
        const friends = user.friends


        res.status(200).json({ message: allMsg,userId,userImage,friends,user })
        return

    }

    static async checkTalk(req,res){
        const idTalk = req.params.id
        const talk = await Talk.findOne({ idTalk: idTalk })

        const allMsg = talk.messages


        res.status(200).json({ message: allMsg })
        return


    }

}