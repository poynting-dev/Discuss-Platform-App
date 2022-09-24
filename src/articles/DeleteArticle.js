import { deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import React from 'react'
import { toast } from 'react-toastify'
import { db, storage } from '../firebase'

export default function DeleteArticle({ id, imageUrl }) {
    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, 'discuss-posts', id))
            toast('Article deleted successfully', { type: 'success' })
            const storageRef = ref(storage, imageUrl)
            await deleteObject(storageRef)
        } catch (error) {
            toast(error, { type: 'error' })
            console.log(error)
        }
    }

    return (
        <div>
            <button className="btn btn-danger" onClick={handleDelete}>
                Delete
            </button>
        </div>
    )
}
