import React from 'react'

import FormAddPost from '../components/formAddPost'
import Navbar from '../components/navbar'

export default function Post() {

    return (
        <div style={{ backgroundColor: "#FAFAFA" }}>
            <Navbar />
            <div className='container'>
                <div className="page-post">
                    <hr></hr>
                    <FormAddPost />
                </div>
            </div>
        </div>
    )
}