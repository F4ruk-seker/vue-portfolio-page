import axios from "axios";


class projectExperiences{
    async create(context){
        // resume/experience/create
        await axios.post('resume/project/create', context)
    }

    async update(context){
        await axios.put('resume/project/' + context.id, context)
    }
    
    async remove(id){
        const answer = window.confirm('Do you want to delete your project experience information? ')
        if (answer){
            await axios.delete('resume/project/' + id)
        }
    }
}

export default new projectExperiences()
