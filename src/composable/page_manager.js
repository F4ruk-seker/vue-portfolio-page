import axios from "axios";

class PageManager{
    constructor() {
        this.has_error = false
        this.context = {}
    }
    async get_page_context(page_name){
        try {
            const response = await axios.get('page/' + page_name + '/')
            this.context = response.data
            console.log('response.data')
            console.log(response.data)
        } catch (e) {
            this.has_error = true
            Promise.reject(e)
        }
    }

    load_page_context(){
        if (!this.has_error){
            if (!this.context.disable_ceo){
                document.title = this.context.title

            }
        }
    }

    get_context (){
        return this.context
    }

    load_meta(){

    }
}


export default new PageManager();


