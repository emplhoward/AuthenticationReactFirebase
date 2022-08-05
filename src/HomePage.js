import React from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const navigate = useNavigate()

    function handleClickSignUp() {
        navigate("/Signup")
    }

    function handleClickLogin() {
        navigate("/Login")
    }
  
    return(
        <>
            <Card>
                <Card.Body>
                    <Form onSubmit={handleClickSignUp}>
                        <Button className="w-75" type="submit">
                            Sign Up
                        </Button>
                    </Form>

                    <br>
                    </br>

                    <Form onSubmit={handleClickLogin}>
                        <Button className="w-75" type="submit">
                            Login
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </>
    )
}