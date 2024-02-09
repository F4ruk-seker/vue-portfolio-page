import axios from "axios";


class ContentManager {
    constructor(content_type){
        this.content_type = content_type
        this.contents = []
        this.content_tags = []
    }

    async get_contents(tags=[], search=''){
        const response = await axios.get(`content/all/?tags=${tags.join(',')}&content_type=project&search=${search}`)
        this.contents = response.data
        this.set_datetime_fields()
        return response.data
    }

    async get_content_tags(){
        await axios.get('content/type/project').then(response=> {
            content_tags = response.data.sub_tags.forEach((tag_c)=>{
              tag_c.tags.forEach((tag)=>{
                tag.selected = false
              })
            })
        }) 
        return content_tags
    }

    set_datetime_fields(){
        this.contents.forEach((project) => {
            project.created = new Date(project.created);
      
            // Separate date properties and write as name
            const day = project.created.getDate();
            const month = project.created.getMonth() + 1; // Adding 1 because month value is between 0 and 11
            const year = project.created.getFullYear();
      
            // Find the name of the month
            const monthNames = [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ];
            const monthName = monthNames[month - 1]; // Subtracting 1 because the month names array starts from 0
      
            // Update the results
            project.day = day;
            project.month = month;
            project.year = year;
            project.monthName = monthName;
          }); 
    }


}

export default new ContentManager();