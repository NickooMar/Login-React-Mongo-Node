import React, { CSSProperties, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { toast } from 'react-toastify';
import { Form, Card } from "react-bootstrap";
import { Button } from "@material-ui/core";


function Login() {

    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const login = (e: any) => {

        e.preventDefault()

        axios.post('http://localhost:4000/login', {
            username,
            password
        }, {
            withCredentials: true
        }).then((res: AxiosResponse) => {
            if (res.data === 'success') {
                window.location.href = '/profile'
            }
        }, () => {
            toast.error('Failure, Incorrect user or password')
        })
    }


    return (
        <>
            <div className="row">
                <div className="mx-auto" style={{ marginTop: "40px" }}>
                    <Form>
                        <Card style={cardStyle} className="cardCenter" >
                            <div style={{ marginBottom: '70px' }}>
                                <h1 className="display-3 text-center" style={formTitle}>Login Form</h1>
                                <Form.Group controlId="formBasicUsername" style={{marginTop: 25}}>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword" style={{marginTop: 25}}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                                </Form.Group>

                                <Button style={buttonStyle} variant="contained" color="secondary" type="submit" onClick={login}>
                                    login
                            </Button>
                            </div>
                        </Card>
                    </Form>
                </div>
            </div>
        </>
    )
}

const cardStyle: CSSProperties = {
    "justifyContent": "center",
    "alignContent": "center",
    "width": "400px",
    "height": "400px",
    "padding": "30px"
}

const buttonStyle: CSSProperties = {
    "width": "215px",
    "height": "40px",
    "marginTop": "25px"
}

const formTitle: CSSProperties = {
    "fontSize": "45px",
    "marginTop": "20px"
}


export default Login
