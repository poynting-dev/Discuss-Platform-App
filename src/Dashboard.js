import React, { useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { getAuth, updateProfile } from 'firebase/auth'

import Articles from './articles/Articles'
import AddArticle from './articles/AddArticle'

export default function Dashboard() {
    const [error, setError] = useState('')
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()
    const displayName = currentUser.displayName

    async function handleLogout() {
        setError('')

        try {
            await logout()
            navigate('/login')
        } catch {
            setError('Failed to log out')
        }
    }

    return (
        <>
            <Articles />
            {/* <AddArticle /> */}
        </>
        // <>
        //   <Card>
        //     <Card.Body>
        //       <h2 className="text-center mb-4">Profile</h2>
        //       {error && <Alert variant="danger">{error}</Alert>}
        //       <strong>Email: </strong>
        //       {currentUser.email}
        //       <br />
        //       {/* {JSON.stringify(currentUser)} */}
        //       {displayName == null ? "null" : displayName}
        //       <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
        //         Update Profile
        //       </Link>
        //     </Card.Body>
        //   </Card>
        //   <div className="w-100 text-center mt-2">
        //     <Button variant="link" onClick={handleLogout}>
        //       Log Out
        //     </Button>
        //   </div>
        // </>
    )
}
