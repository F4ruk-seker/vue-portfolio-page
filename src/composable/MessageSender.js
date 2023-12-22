import axios from "axios";


class MessageSender{

    async send_message(context){
        try {
            const response =  await axios.post('message/create/', context)
            console.log(response.status)
            console.log(response.data)
            return  response.status === 201
        } catch (e) {
            Promise.reject(e)
        }
    }

}

export default new MessageSender()
