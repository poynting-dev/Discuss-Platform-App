import React, { useState, useRef, useEffect } from 'react'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../firebase'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { fDate } from '../utils/formatTime'

export default function ArticlePage() {
    let { id } = useParams()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        createdAt: '',
    })

    useEffect(() => {
        db.collection('Articles')
            .doc(id)
            .get()
            .then(function (doc) {
                if (doc.exists) {
                    console.log(doc.data())
                    setFormData({
                        title: doc.data().title,
                        description: doc.data().description,
                        image: doc.data().imageUrl,
                        createdAt: fDate(
                            doc.data().createdAt.toDate().toDateString()
                        ),
                    })
                    console.log(formData)
                } else {
                    // doc.data() will be undefined in this case
                    console.log('No such document!')
                }
            })
            .catch(function (error) {
                console.log('Error getting document:', error)
            })
    }, [])

    const fetchedImgSrc = formData.image
    return (
        <>
            <div className="container">
                <div
                    className="bg-fixed rounded-t-lg h-80"
                    style={{
                        backgroundImage: 'url(' + fetchedImgSrc + ')',
                    }}
                >
                    <div className="items-center py-8 lg:px-32 md:px-16 sm:px-8">
                        <div className="group pb-5">
                            <img
                                className="shrink-0 h-12 w-12 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt="dp"
                            />
                            <div className="ltr:ml-3 rtl:mr-3">
                                <p className="text-sm font-medium text-slate-300 group-hover:text-white">
                                    Priyanshu Dixit
                                </p>
                                <p className="text-sm font-medium text-white-500 group-hover:text-slate-300">
                                    4th year CSE Student
                                </p>
                            </div>
                        </div>
                        <div class=" font-bold text-3xl text-white">
                            {formData.title}
                        </div>
                        <div class="mt-1 font-medium text-sm text-white">
                            {formData.createdAt} · 4 min read
                        </div>
                    </div>
                </div>
                <div className="bg-black rounded-b-sm py-8">
                    <div className="container lg:px-32 md:px-16 py-8">
                        <p
                            className="first-line:uppercase first-line:tracking-widest
                    first-letter:text-7xl first-letter:font-bold first-letter:text-white text-white
                    first-letter:mr-3 first-letter:float-left leading-loose
                    "
                        >
                            Well, let me tell you something, funny boy. Y'know
                            that little stamp, the one that says "New York
                            Public Library"? Well that may not mean anything to
                            you, but that means a lot to me. One whole hell of a
                            lot.
                        </p>
                        <p class="mt-4 leading-7 text-white">
                            Maybe we can live without libraries, people like you
                            and me. Maybe. Sure, we're too old to change the
                            world, but what about that kid, sitting down,
                            opening a book, right now, in a branch at the local
                            library and finding drawings of pee-pees and
                            wee-wees on the Cat in the Hat and the Five Chinese
                            Brothers? Doesn't HE deserve better?
                        </p>
                        <p class="mt-4 leading-7 text-slate-500">
                            {formData.description}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
