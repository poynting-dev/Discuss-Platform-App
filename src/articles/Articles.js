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
        <div>
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
                    }) => (
                        <div class="md:flex rounded overflow-hidden shadow-lg mb-4">
                            {/* <img
                                class="w-full"
                                src="/img/card-top.jpg"
                                alt="Sunset in the mountains"
                            > */}
                            <div class="px-6 py-4">
                                <div class="font-bold text-xl mb-2">
                                    {title}
                                </div>
                                <p class="text-gray-700 text-base">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Voluptatibus quia, nulla!
                                    Maiores et perferendis eaque, exercitationem
                                    praesentium nihil.
                                </p>

                                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    #photography
                                </span>
                                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    #travel
                                </span>
                                <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                                    #winter
                                </span>
                            </div>

                            <div class="w-100 flex md:flex-col sm:flex-row p-6 max-w-sm bg-white  dark:bg-gray-800 dark:border-gray-700">
                                <div class="w-100 row-sm-12 items-center">
                                    <img
                                        class="w-10 h-10 rounded-full mr-4"
                                        src="https://v1.tailwindcss.com/img/jonathan.jpg"
                                        alt="Avatar of Jonathan Reinink"
                                    />
                                    <div class="text-sm">
                                        <p class="text-gray-900 leading-none">
                                            {postedBy}
                                        </p>
                                        <p class="text-gray-600">
                                            {createdAt.toDate().toDateString()}
                                        </p>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    class="w-100 h-75  row-sm-12 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Read more
                                    <svg
                                        aria-hidden="true"
                                        class="ml-2 -mr-1 w-4 h-4"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                            clip-rule="evenodd"
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

{
    /* <div className="border mt-3 p-3 bg-light" key={id}>
                            <div className="row">
                                <div className="col-3">
                                    <img
                                        src={imageUrl}
                                        alt={title}
                                        style={{ width: 180, height: 180 }}
                                    />
                                </div>
                                <div className="col-9 ps-3">
                                    <h2>{title}</h2>
                                    <p>{createdAt.toDate().toDateString()}</p>
                                    <h4>{description}</h4>
                                    <DeleteArticle
                                        id={id}
                                        imageUrl={imageUrl}
                                    />
                                </div>
                            </div>
                        </div> */
}
