import React, { useRef, useState, useContext } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import firebase from './firebase'
import { Link, useNavigate } from 'react-router-dom'

const LoginContext = React.createContext() // Create a context that can be used by other components.
// Pass in a value to the context provider with: <LoginContext.Provider value={currentUser} /> 

export function useLoginContext() {
    return useContext(LoginContext) // Return the context to use.
}

export default function Login() {
    const [currentUser, setCurrentUser] = useState()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef = useRef()

    function setLoggedInUser() {
        const unsub = firebase.auth().onAuthStateChanged(user => {
            setCurrentUser(user)
            console.log(JSON.stringify(user.email))
        })

        return unsub
    }

    async function handleLogin(e) {
        e.preventDefault()

        if(passwordRef.current.value.length < 6) {
            return setError('Password must be at least 6 characters.')
        }

        try {
            setLoading(true) // Prevent multi clicks.

            await firebase.auth().signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
            
            setLoggedInUser()

            navigate("/Dashboard")

            setLoading(false)
        }
        catch {
            setLoading(false)

            return setError('Failed to log in.')
        }         
    }

    return(
        <>
            <LoginContext.Provider value={currentUser} /> 

            <Card>
                <Card.Body>
                    <h2 className="text-center mb-5"> Log In </h2>

                    {error && <Alert variant="danger"> {error} </Alert>}

                    <Form onSubmit={handleLogin}>
                        <Form.Group id="email">
                            <Form.Label> Email </Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>

                        <Form.Group id="password">
                            <Form.Label> Password </Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>

                        <br></br>

                        <Button disabled={loading} className="w-75" type="submit">
                            Log In
                        </Button>
                   </Form>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                Don't have an account? <Link to="/Signup"> Register </Link> 
            </div>
        </>
    )
}