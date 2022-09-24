import React, { useState, useRef, useEffect, Component } from 'react'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { db, storage } from '../firebase'
import './handler.css'
import { toast } from 'react-toastify'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import parse from 'html-react-parser'

var content =
    "<p>I had OA today, I got 3 questions to solve. I solved other two but couldn't solve this.<br>Pls share the solution.</p><p>&nbsp;</p><h2>Problem Statement</h2><p>&nbsp;</p><p>There is a door at Amazon Office which can be used only by one person at a time i. e either a person can enter from the door or exit but no two people can do it simultaneously. If two person going in the opposite direction arrived at the door at the same time then these 3 cases should be considered:-</p><p>&nbsp;</p><p>If the door was not used before or it was not used in the previous second then the person who wants to exit goes first.<br>If the door has been used in the previous second for entering, then the person who wants to enter goes first.<br>If the door has been used in the previous second for exiting, then the person who wants to exist goes first.<br>If two people arrive at the same time and going in the same direction then the person whose name in the given list comes first will go first.</p><p>&nbsp;</p><p>Note:- To cross the door, it will take exactly one second for each person.<br>Input<br>The first line of input contains a single integer N containing the number of people The second line of input contains N space- separated integers depicting the arrival time of the ith person. The last line of input containing N space- separated integers which are either 0 or 1. 0 indicates that the person wants to enter and 1 indicates he wants to exit.</p><p>&nbsp;</p><h2>Constraints:-</h2><p>&nbsp;</p><p>1 &lt;= N &lt;= 50000<br>0 &lt;= Arrival[i] &lt;= Arrival [i+1] &lt;= 1000000000</p>"

export default function CreatePost() {
    const [image, setImage] = useState(null)
    const [previewUrl, setPreviewUrl] = useState('')
    const fileInput = useRef(null)

    //---------------------FILE UPLOAD OPERTIONS BELOW-------------------------
    const [formData, setFormData] = useState({
        title: '',
        postContent: content,
        image: '',
        createdAt: Timestamp.now().toDate(),
        likes: 0,
        comments: [],
        postedBy: 'dixitpriyanshu23@gmail.com',
    })

    const [progress, setProgress] = useState(0)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] })
    }

    const handlePublish = () => {
        if (!formData.title || !formData.postContent || !formData.image) {
            console.log(formData)
            alert('Please fill all the fields')
            return
        }

        const storageRef = ref(
            storage,
            `/images/${Date.now()}${formData.image.name}`
        )

        const uploadImage = uploadBytesResumable(storageRef, formData.image)
        uploadImage.on(
            'state_changed',
            (snapshot) => {
                const progressPercent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progressPercent)
            },
            (err) => {
                console.log(err)
            },
            () => {
                setFormData({
                    title: '',
                    description: '',
                    image: '',
                })

                getDownloadURL(uploadImage.snapshot.ref).then((url) => {
                    const articleRef = collection(db, 'discuss-posts')
                    addDoc(articleRef, {
                        title: formData.title,
                        postContent: formData.postContent,
                        imageUrl: url,
                        createdAt: Timestamp.now().toDate(),
                        likes: 0,
                        comments: [],
                        postedBy: formData.postedBy,
                    })
                        .then(() => {
                            toast('Article added successfully', {
                                type: 'success',
                            })
                            setProgress(0)
                        })
                        .catch((err) => {
                            toast('Error adding article', { type: 'error' })
                        })
                })
            }
        )
    }
    ///-----------------------------FILE UPLOAD OPERATIONS----------------------------

    const handleFile = (file) => {
        //you can carry out any file validations here...
        setImage(file)
        setPreviewUrl(URL.createObjectURL(file))
        setFormData({ ...formData, image: file })
        // console.log(formData)
        // console.log(db)
        console.log(image)
    }
    const handleDragOver = (e) => {
        e.preventDefault()
    }
    const handleOnDrop = (e) => {
        //prevent the browser from opening the image
        e.preventDefault()
        e.stopPropagation()
        //let's grab the image file
        let imageFile = e.dataTransfer.files[0]
        handleFile(imageFile)
    }

    return (
        <>
            <div className="container mt-2">
                <button>
                    <a
                        href="/"
                        className="relative inline-flex items-center justify-start py-3 pl-4 mb-3 pr-12 overflow-hidden font-semibold text-indigo-600 transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group"
                    >
                        <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-indigo-600 group-hover:h-full"></span>
                        <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABk0lEQVRIie2UMUhUcRzHP78/V+EgNEhDKPeK60RwkVqkNqcWhYYWoVy8zS2HhtN/SBARBEWLONRkiERDa7NL0eD2rO70jggSBBUVPO/rINK9O+ze80mTn/F9f3w/j//v/x6c0waLM9RbmhqRc6+ROpBNhNf8+7gC127gRtk/ktkHpB6gC+NV3HKAzEnBzS+FC1tdV9+AxiOB+J1aEJT85S1jETTUFFVd5mA0lSC/6q8jPoH6ool9O6jtj4TB00oSQWQHuXJxEGmppVwsbF/kzo9csnJouEW9q/6+xFtQR0OzkHseBv4xhpKWHwmE5cvTHlMRLNa1jUkVVLB8afodxoMzLP6LWcVhZ/rWLbgw6x8KmwGd6oxPxKxidQr/YckN5MrFQYf7CFyJTImFnczmWLXn5W4qAfz7Q6tnGP7e7atJBC0/uzDrf16yvdtgn6OJBlxNS31rvj+VAGA5+2yjc/3XXWCuKequ1TWfWgDw9dbsfhg8GRc2CdSPn1vzfk4rOGYl8C9MuodZBeyPmU0kEZzTlkM6yI7t90+uXwAAAABJRU5ErkJggg==" />
                        </span>
                        <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABmJLR0QA/wD/AP+gvaeTAAABk0lEQVRIie2UMUhUcRzHP78/V+EgNEhDKPeK60RwkVqkNqcWhYYWoVy8zS2HhtN/SBARBEWLONRkiERDa7NL0eD2rO70jggSBBUVPO/rINK9O+ze80mTn/F9f3w/j//v/x6c0waLM9RbmhqRc6+ROpBNhNf8+7gC127gRtk/ktkHpB6gC+NV3HKAzEnBzS+FC1tdV9+AxiOB+J1aEJT85S1jETTUFFVd5mA0lSC/6q8jPoH6ool9O6jtj4TB00oSQWQHuXJxEGmppVwsbF/kzo9csnJouEW9q/6+xFtQR0OzkHseBv4xhpKWHwmE5cvTHlMRLNa1jUkVVLB8afodxoMzLP6LWcVhZ/rWLbgw6x8KmwGd6oxPxKxidQr/YckN5MrFQYf7CFyJTImFnczmWLXn5W4qAfz7Q6tnGP7e7atJBC0/uzDrf16yvdtgn6OJBlxNS31rvj+VAGA5+2yjc/3XXWCuKequ1TWfWgDw9dbsfhg8GRc2CdSPn1vzfk4rOGYl8C9MuodZBeyPmU0kEZzTlkM6yI7t90+uXwAAAABJRU5ErkJggg==" />
                        </span>
                        <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                            Go Back
                        </span>
                    </a>
                </button>
                <div className=" md:grid-cols-3 md:gap-6">
                    <div className="text-5xl font-bold">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                            Publish a New Blog
                        </span>
                    </div>
                    <div className="mt-4 md:mt-0 md:col-span-2">
                        <div className="shadow sm:rounded-md sm:overflow-hidden">
                            <div className="px-4 bg-white sm:p-6 bg-gradient-to-r from-cyan-500 to-blue-500">
                                <div>
                                    <label
                                        htmlFor="title"
                                        className="block text-3xl font-medium text-gray-700 mb-1"
                                    >
                                        Title
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            id="title"
                                            onChange={(e) => handleChange(e)}
                                            placeholder="Enter Title here!"
                                            className="bg-neutral-700	text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 p-3 block w-full sm:text-lg border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                                {progress === 0 ? null : (
                                    <div className="progess">
                                        <div
                                            className="progress-bar progress-bar-striped progress-bar-animated"
                                            role="progressbar"
                                            style={{ width: `${progress}%` }}
                                        >
                                            {`uploading image ${progress}%`}
                                        </div>
                                    </div>
                                )}
                                <div className="mt-4">
                                    <label className="block text-3xl font-medium text-gray-700">
                                        Cover photo
                                    </label>
                                    <div className="pt-3">
                                        <div
                                            className="drop_zone bg-neutral-700	text-white"
                                            onDragOver={handleDragOver}
                                            onDrop={handleOnDrop}
                                            onClick={() =>
                                                fileInput.current.click()
                                            }
                                        >
                                            <p>
                                                Click to select or Drag and drop
                                                image here....
                                            </p>
                                            <p>
                                                Upload image 2 times "&" also
                                                check console.log
                                            </p>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={fileInput}
                                                name="image"
                                                hidden
                                                onChange={(e) => {
                                                    handleFile(
                                                        e.target.files[0]
                                                    )
                                                    setImage(e.target.files[0])
                                                }}
                                                // onChange={(e) => handleImageChange(e)}
                                            />
                                        </div>
                                        {previewUrl && (
                                            <img src={previewUrl} alt="image" />
                                        )}
                                    </div>
                                </div>

                                <div className="mt-4 pb-4">
                                    <label
                                        htmlFor="title"
                                        className="block text-3xl font-medium text-gray-700 mb-2"
                                    >
                                        Content
                                    </label>
                                    <div className="mt-1">
                                        <Editor
                                        // formData={formData}
                                        // setFormData={setFormData}
                                        />
                                        {/* <textarea
                                            type="text"
                                            name="description"
                                            id="content"
                                            onChange={(e) => handleChange(e)}
                                            rows={4}
                                            placeholder="Write content here!"
                                            className="bg-neutral-700	text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 p-3 block w-full sm:text-lg border-gray-300 rounded-md"
                                        /> */}
                                    </div>
                                </div>
                                <div className="pb-4 w-full sm:px-6 text-white">
                                    <button
                                        type="submit"
                                        className="text-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 w-full rounded-md hover:from-pink-500 hover:to-yellow-500"
                                        onClick={handlePublish}
                                    >
                                        Post
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

class Editor extends Component {
    constructor(props) {
        super(props)
        this.state = { content: '' }
    }

    render() {
        return (
            <>
                <div className="editor">
                    <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        onChange={(event, editor) => {
                            const data = editor.getData()
                            this.setState({ data })
                            {
                                content = data
                                console.log(data)
                            }
                            // setEditorText(data)
                        }}
                    />
                </div>
                <div>
                    <h2>Content here</h2>
                    <p>{parse(content)}</p>
                </div>
            </>
        )
    }
}
