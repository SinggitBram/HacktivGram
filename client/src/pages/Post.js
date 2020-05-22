import React from 'react'

import FormAddPost from '../components/formAddPost'
import MyPost from '../components/MyPost'
import Navbar from '../components/navbar'

export default function Post(){

    return (
        <>
            <div className="page-post">
                <Navbar />
                <h3>Post Page</h3>
                <MyPost></MyPost>
                <hr></hr>
                <FormAddPost></FormAddPost>
            </div>
        </>
    )
}