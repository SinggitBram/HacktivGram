import React from 'react'

import FormAddPost from '../components/formAddPost'
import MyPost from '../components/MyPost'

export default function Post(){

    return (
        <>
            <div className="page-post">
                <h3>Post Page</h3>
                <MyPost></MyPost>
                <hr></hr>
                <FormAddPost></FormAddPost>
            </div>
        </>
    )
}