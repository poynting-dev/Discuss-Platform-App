import React, { Fragment, useState, useEffect, useContext } from 'react'
import { Form, Button as bootstrapBTN, Card, Container } from 'react-bootstrap'
import { Transition } from '@headlessui/react'
import Signup from './Signup'
import Dashboard from './Dashboard'
import Login from './Login'
import 'bootstrap/dist/css/bootstrap.min.css'

import { useAuth, AuthProvider } from './contexts/AuthContext'
import { getAuth, updateProfile } from 'firebase/auth'
import { Link, useNavigate } from 'react-router-dom'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    Outlet,
} from 'react-router-dom'

import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
} from '@material-tailwind/react'

import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
import CreatePost from './articles/CreatePost'
import ArticlePage from './articles/ArticlePage'
import Logout from './Logout'

function App() {
    // const { logout } = useContext(AuthProvider)
    // const [error, setError] = useState('')
    // const navigate = useNavigate()
    // const displayName = currentUser.displayName

    // async function handleLogout() {
    //     setError('')
    //     try {
    //         await logout()
    //         navigate('/login')
    //     } catch {
    //         setError('Failed to log out')
    //     }
    // }

    return (
        <>
            {/* <button className="h2" onClick={handleLogout}> */}
            {/* Logout */}
            {/* </button> */}
            {/* <div */}
            {/* className="d-flex align-items-center justify-content-center"
                // style={{ minHeight: '100vh' }}
            > */}
            {/* <div className="w-100" style={{ maxWidth: '400px' }}> */}
            <Router>
                <Fragment>
                    <AuthProvider>
                        {/* <Logout /> */}
                        <NavBar />
                        <Routes>
                            <Route exact path="/" element={<PrivateRoute />}>
                                <Route exact path="/" element={<Dashboard />} />
                                <Route
                                    path="/update-profile"
                                    element={<UpdateProfile />}
                                />
                            </Route>
                            <Route
                                path="/createPost"
                                element={<CreatePost />}
                            />
                            <Route
                                path="/articlepage/:id"
                                element={<ArticlePage />}
                            />

                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/forgot-password"
                                element={<ForgotPassword />}
                            />
                        </Routes>
                    </AuthProvider>
                </Fragment>
            </Router>
            {/* </div> */}
            {/* </div> */}
        </>
    )
}

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <img
                                    className="h-8 w-8"
                                    src="https://img.icons8.com/external-filled-agus-raharjo/344/external-communication-communication-filled-agus-raharjo-2.png"
                                    alt="Workflow"
                                />
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <a
                                        href="/"
                                        className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        Dashboard
                                    </a>

                                    <a
                                        href="/createPost"
                                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                    >
                                        New Post
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    {(ref) => (
                        <div className="md:hidden" id="mobile-menu">
                            <div
                                ref={ref}
                                className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
                            >
                                <a
                                    href="/"
                                    className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                                >
                                    Dashboard
                                </a>

                                <a
                                    href="/createPost"
                                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                                >
                                    New Post
                                </a>
                            </div>
                        </div>
                    )}
                </Transition>
            </nav>
        </div>
    )
}

export default App
