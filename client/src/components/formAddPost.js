import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import {storage} from '../firebase/firebase'

export default function Post(){

    const host = 'https://safe-headland-69478.herokuapp.com' // 'http://localhost:3000'

    const history = useHistory()

    const [title, setTitle] = useState('')
    const [image_url, setImage] = useState('')
    const [location, setLocation] = useState('')

    const [imageAsFile, setImageAsFile] = useState('')

    const handleImageAsFile = (e) => {
        const image = e.target.files[0]
        setImageAsFile(imageFile => (image))
    }

    const handleFireBaseUpload = e => {
        e.preventDefault()
      console.log('start of upload')
      // async magic goes here...
      if(imageAsFile === '') {
        console.error(`not an image, the image file is a ${typeof(imageAsFile)}`)
      }
      const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
      uploadTask.on('state_changed', 
      (snapShot) => {
        console.log(snapShot)
      }, (err) => {
        console.log(err)
      }, () => {
        storage.ref('images').child(imageAsFile.name).getDownloadURL()
         .then(fireBaseUrl => {
             console.log(fireBaseUrl,"---firebaseURl")
           setImage(fireBaseUrl)
         })
      })
      }
  

    function titleChange(e){
        setTitle(e.target.value)
    }

    function imageChange(e){
        setImage(e.target.value)
    }

    function getCity(e){
        e.preventDefault()
        axios({
            method: 'get',
            url: 'https://api.ipgeolocation.io/ipgeo?apiKey=bb3f2694800d4f99bbaf8a7063c20096'
        })
        .then(data=>{
            console.log(data.data)
            setLocation(data.data.city)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    function submitPost(e){
        e.preventDefault();
        let token = localStorage.getItem('token')
        axios({
            method : "post",
            url: `${host}/posts`,
            headers: {token},
            data: {
                title,
                image_url,
                location
            }
        })
        .then(data=>{
            console.log(data.data)
            history.push('/')
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <>
            <div>
                <h3>Form Add Post</h3>
                <button type="button" onClick={getCity}>Activate location</button>
                {location}
                <hr></hr>
                <form onSubmit={handleFireBaseUpload}>
                    Click here if you want to upload your image otherwise put link on image link
                    <input 
                    type="file"
                    onChange={handleImageAsFile}
                    />
                    <button>upload to firebase</button>
                </form>
                <hr></hr>

                <form onSubmit={submitPost}>
                    <label>Title</label>
                    <input onChange={titleChange} type="text"></input><br></br>
                    <label>Image Link</label>
                    <input onChange={imageChange} type="text" value={image_url}></input><br></br>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </>
    )
}