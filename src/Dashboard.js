import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // Get signed-in user from firebase: https://firebase.google.com/docs/auth/web/manage-users
    const auth = getAuth()
    const user = auth.currentUser

    const [currentUser, setUser] = useState(user)

    async function handleLogout(e) {
        e.preventDefault()

        try {
            setLoading(true) // Prevent multi clicks.

            navigate("/")

            setLoading(false)
        }
        catch {
            setLoading(false)

            return setError('Failed to log out.')
        }         
    }

    if(currentUser != undefined) {
        return(
            <>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-5"> Dashboard </h2>
    
                        <strong> Email: </strong>
                        {currentUser.email}
    
                        <p>
                            This page is a stub.
                        </p>
    
                        {error && <Alert variant="danger"> {error} </Alert>}
    
                        <Button className="w-75" onClick={handleLogout}>
                                Log Out
                        </Button>
    
                    </Card.Body>
                </Card>
            </>
        )
    }
    else {
        return(
            <>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-5"> No users have logged in. </h2>
                    </Card.Body>
                </Card>
            </>
        )
    }
}