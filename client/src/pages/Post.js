import React from 'react'

import FormAddPost from '../components/formAddPost'
import Navbar from '../components/navbar'

export default function Post(){

    return (
        <>
            <div className="page-post">
                <Navbar />
                <h3>Post Page</h3>
                <hr></hr>
                <FormAddPost></FormAddPost>
            </div>
        </>
    )
}