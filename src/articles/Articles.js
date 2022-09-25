import React, { useEffect, useState } from 'react'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase'
import DeleteArticle from './DeleteArticle'
import { useAuth } from '../contexts/AuthContext'

export default function Articles() {
    const [articles, setArticles] = useState([])

    const { currentUser } = useAuth()

    useEffect(() => {
        const articleRef = collection(db, 'discuss-posts')
        // console.log(articleRef)
        const q = query(articleRef, orderBy('createdAt', 'desc'))
        onSnapshot(q, (snapshot) => {
            const articles = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            setArticles(articles)
            console.log(articles)
        })
        ///////////////////
        const uid = currentUser.email
        const discussRef = collection(db, `discuss-posts`)
        const queryPosts = query(discussRef)
        onSnapshot(queryPosts, (snapshot) => {
            const articles = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }))
            console.log('Posts:' + JSON.stringify(articles))
        })
    }, [])
    return (
        <div className="container">
            {articles.length === 0 ? (
                <p>No Articles</p>
            ) : (
                articles.map(
                    ({
                        id,
                        title,
                        postContent,
                        imageUrl,
                        createdAt,
                        likes,
                        comments,
                        postedBy,
                        tags,
                    }) => (
                        <div className="md:flex rounded overflow-hidden shadow-lg mb-4">
                            {/* <img
                                className="w-full"
                                src="/img/card-top.jpg"
                                alt="Sunset in the mountains"
                            > */}
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">
                                    {title}
                                </div>
                                <p className="text-gray-700 text-base">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Voluptatibus quia, nulla!
                                    Maiores et perferendis eaque, exercitationem
                                    praesentium nihil.
                                </p>

                                <div className="flex space-x-4 my-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 mr-1"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                                        />
                                    </svg>
                                    {likes.length}
                                    <div className="mr-2" />
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="w-6 h-6 mx-1"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                                        />
                                    </svg>
                                    {comments.length}
                                </div>

                                <div>
                                    {tags &&
                                        tags.map((tag, index) => (
                                            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                                #{tag}
                                            </span>
                                        ))}
                                </div>
                            </div>

                            <div className="w-100 flex md:flex-col sm:flex-row p-6 max-w-sm bg-white  dark:bg-gray-800 dark:border-gray-700">
                                <div className="w-100 row-sm-12 items-center">
                                    <img
                                        className="w-10 h-10 rounded-full mr-4"
                                        src="https://v1.tailwindcss.com/img/jonathan.jpg"
                                        alt="Avatar of Jonathan Reinink"
                                    />
                                    <div className="text-sm">
                                        <p className="text-gray-900 leading-none">
                                            {postedBy}
                                        </p>
                                        <p className="text-gray-600">
                                            {createdAt.toDate().toDateString()}
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href={`/articlepage/${id}`}
                                    className="w-100 h-75  row-sm-12 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Read more
                                    <svg
                                        aria-hidden="true"
                                        className="ml-2 -mr-1 w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    )
                )
            )}
        </div>
    )
}
