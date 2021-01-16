import React, { CSSProperties, useState } from 'react'
import axios, { AxiosResponse } from 'axios'
import { useHistory } from 'react-router-dom';
import { toast } from "react-toastify";
import { Form, Card } from 'react-bootstrap'
import { Button } from "@material-ui/core";

function Register() {
  const history = useHistory();

  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirm_password, setConfirm_password] = useState<string>('')

  const register = (e:any) => {
    e.preventDefault();

    if (password === confirm_password) {
      axios.post('http://localhost:4000/register', {
        username,
        password,
        confirm_password
      }, {
        withCredentials: true
      }).then((res: AxiosResponse) => {
        if (res.data === 'success') {
          history.push('/login')
          toast.success('User Created Successfully')
        } else {
          toast.error('User Already Exists')
        }
      })
    } else {
      toast.error("Password Doesn't Match")
    }


  }


  return (

    <>
            <div className="row">
                <div className="mx-auto" style={{marginTop: "40px"}}>
                    <Form>
                        <Card style={cardStyle} className="cardCenter">
                            <h1 className="display-3 text-center" style={registerTitle}>Register Form</h1>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicConfirm_Password">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" onChange={e => setConfirm_password(e.target.value)} />
                            </Form.Group>

                            <Button style={buttonStyle} variant="contained" color="secondary" type="submit" onClick={register}>
                                Register
                            </Button>
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
  "width": "197px",
  "height": "40px",
  "marginBottom": "25px"
}

const registerTitle: CSSProperties = {
  "fontSize": "45px",
  "marginTop": "20px",
  "marginBottom": "20px"
} 

export default Register
