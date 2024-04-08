import axios from "axios";


class WorkExperiences{
    async create(context){
        // resume/experience/create
        await axios.post('resume/experience/create', context)
    }

    async update(context){
        await axios.put('resume/experience/' + context.id, context)
    }
    
    async remove(id){
        const answer = window.confirm('Do you want to delete your work experience information? ')
        if (answer){
            await axios.delete('resume/experience/' + id)
        }
    }
}

export default new WorkExperiences()
