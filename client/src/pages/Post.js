import React from 'react'

import FormAddPost from '../components/formAddPost'
import Navbar from '../components/navbar'

export default function Post() {

    return (
        <>
            <div>
                <Navbar />
                <div className='container'>
                    <div className="page-post">
                        <h3>Post Page</h3>
                        <hr></hr>
                        <FormAddPost />
                    </div>
                </div>
            </div>
        </>
    )
}