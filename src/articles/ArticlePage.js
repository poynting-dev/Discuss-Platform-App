import React, { useState, useRef, useEffect } from 'react'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../firebase'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import parse from 'html-react-parser'

export default function ArticlePage() {
    let { id } = useParams()

    const currentUser = 'dixitpriyanshu23@gmail.com'

    var likedByCurrentUser = false

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        createdAt: '',
        likes: [],
        comments: [],
        postedBy: '',
    })

    const handleLike = () => {
        if (likedByCurrentUser == true) {
            for (var i = 0; i < formData.likes.length; i++) {
                if (formData.likes[i] === currentUser) {
                    formData.likes.splice(i, 1)
                }
            }
        } else {
            formData.likes.push(currentUser)
        }

        db.collection('discuss-posts').doc(id).update({
            likes: formData.likes,
        })
    }

    useEffect(() => {
        db.collection('discuss-posts')
            .doc(id)
            .get()
            .then(function (doc) {
                if (doc.exists) {
                    console.log(doc.data())
                    setFormData({
                        title: doc.data().title,
                        description: doc.data().postContent,
                        // image: doc.data().imageUrl,
                        // createdAt: fDate(
                        //     doc.data().createdAt.toDate().toDateString()
                        // ),
                        // createdAt: doc.data().toDate(),
                        likes: doc.data().likes,
                        comments: doc.data().comments,
                    })
                    if (formData.likes.indexOf(currentUser) > -1) {
                        likedByCurrentUser = true
                    }
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
    console.log(likedByCurrentUser)

    const fetchedImgSrc = formData.image
    return (
        <div className="">
            <div className="fixed mt-2 font-bold h-100 text-center">
                <button onClick={handleLike}>
                    {likedByCurrentUser ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-10 h-10"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-10 h-10"
                        >
                            <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                        </svg>
                    )}
                    <div className="text-2xl">{formData.likes.length}</div>
                </button>
            </div>
            <div className="container w-75 bg-blue-400 rounded-b-md">
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
                <div className="bg-black rounded-md py-8">
                    <div className="container lg:px-32 md:px-16 py-8">
                        <p class="mt-4 leading-7 text-white">
                            {parse(formData.description)}
                        </p>
                    </div>
                </div>
                <div className="mb-5 py-4">
                    {!formData.comments ? (
                        <div className="text-2xl font-semibold">
                            No Comments
                        </div>
                    ) : (
                        <div className="text-2xl font-semibold">
                            Comments{' '}
                            {formData.comments.map((val) => (
                                <div class="grid grid-cols-1 gap-5">
                                    <div class="rounded overflow-hidden shadow-lg">
                                        <div class="px-6 py-4">
                                            <div class="font-bold text-xl mb-2">
                                                Forest
                                            </div>
                                            <p class="text-gray-700 text-base">
                                                Lorem ipsum dolor sit amet,
                                                consectetur adipisicing elit.
                                                Voluptatibus quia, nulla!
                                                Maiores et perferendis eaque,
                                                exercitationem praesentium
                                                nihil.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
