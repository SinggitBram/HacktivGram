import React, { useState } from 'react'
import axios from 'axios'
import {storage} from '../firebase/firebase'

export default function Post(){

    const host = 'http://localhost:3000'

    const [title, setTitle] = useState('')
    const [image_url, setImage] = useState('')
    const [location, setLocation] = useState('')

    //const allInputs = {imgUrl: ''}
    const [imageAsFile, setImageAsFile] = useState('')
    //const [imageAsUrl, setImageAsUrl] = useState('')

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
      //initiates the firebase side uploading 
      uploadTask.on('state_changed', 
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
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

    // function getLocation() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(getPosition);
            
    //     } else {
    //       console.log("Geolocation is not supported by this browser.");
    //     }
    // }
    
    // function getPosition(position) {
    //     console.log(position.coords.latitude, position.coords.longitude);
    //     var lat = position.coords.latitude;
    //     var lng = position.coords.longitude;
    //     //setLocation()
    // }

    // API : 4650834580bf4f79b3c606164783a748

    // API : bb3f2694800d4f99bbaf8a7063c20096


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
        //let token = localStorage.getItem('token')
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJuZXJvQG1haWwuY29tIiwiaWF0IjoxNTg5OTc3NjI5fQ.0_FZn44rVJBlIiHBQPpL4Ry4DD_ceZ8SRSNX9fKLx_A'
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