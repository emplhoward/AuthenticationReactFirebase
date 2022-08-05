import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import firebase from './firebase'
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()

    async function handleSubmit(e) {
        e.preventDefault()

        if(passwordRef.current.value.length < 6) {
            return setError('Password must be at least 6 characters.')
        }

        if(passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match.')
        }

        try {
            setLoading(true) // Prevent multi clicks.

            await firebase.auth().createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
            
            setError('You have registered an account.')

            navigate('/Login')
    
            setLoading(false)
        }
        catch {
            setLoading(false)

            return setError('Failed to sign up.')
        }         
    }

    return(
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-5"> Sign Up </h2>

                    {error && <Alert variant="danger"> {error} </Alert>}

                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label> Email </Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>

                        <Form.Group id="password">
                            <Form.Label> Password </Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>

                        <Form.Group id="passwordConfirm">
                            <Form.Label> Confirm Password </Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>

                        <br></br>

                        <Button disabled={loading} className="w-75" type="submit">
                            Sign Up
                        </Button>
                   </Form>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                If you already have an account: <Link to="/Login"> Login </Link>  
            </div>
        </>
    )
}