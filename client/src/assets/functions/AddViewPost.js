import axios from 'axios'

export default function AddViewPost(id){
    const host = 'http://localhost:3000'

    axios({
        method: "put",
        url: `${host}/posts/views/${id}`,
    })
    .then(data=>{
        return console.log(data.data)
    })
    .catch(err=>{
        return console.log(err)
    })

}