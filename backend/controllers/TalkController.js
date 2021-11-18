const Talk = require('../models/Talk')
const User = require('../models/User')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')



module.exports = class TalkController {

    static async newTalk(req, res) {

        const token = getToken(req)
        const user1 = getUserByToken(token)
        const idTalk = JSON.stringify(user1)

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

    static async newMessage(req, res) {

        const {message,idUser} = req.body
        const idTalk = req.params.id
        const talk = await Talk.findOne({ idTalk: idTalk })

        if(!message){
            res.status(422).json({ message: 'Preencha o campo mensagem' })
            return
        }

        if(!idUser){
            res.status(422).json({ message: 'Preencha o campo idUser' })
            return
        }

        const msg = [message,idUser]


        if (!talk) {
            res.status(422).json({ message: 'Essa conversa não existe no sistema!' })
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

        const allMsg = talk.messages

        res.status(200).json({ message: allMsg })
        return

    }

}