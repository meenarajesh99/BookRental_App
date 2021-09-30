import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import {useState} from "react"



function Register(props){

    const[username, setUserName] = useState();
    const[password, setPassword] = useState();
    const[email, setEmail] = useState();
    const[success, setSuccess] = useState(false);

    async function RegisterUser(credentials){
        return fetch('http://localhost:9999/v1/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(data => {
          data.json()
        console.log(data)
        if(data)
        {
        setSuccess(true)
        }
      })
        .catch(error => {
          console.error('Error:', error)});
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await RegisterUser({
            username,
            password,
            email
        });
        console.log(token)
      }


    return(
      <div>
      <div className="container">
        <div className="small-container">
<Form>

      <h1>Register</h1>
      <br/><br/><br/><br/>
  <Form.Group className="mb-3" controlId="formUserName">
    <Form.Label>User Name</Form.Label>
    <Form.Control type="text" placeholder="Enter username" onChange={e => setUserName(e.target.value)}/>
    <br/>
  </Form.Group>
  <br/>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" onChange ={e => setPassword(e.target.value)} />
  </Form.Group>
  <br/>
  <Form.Group className="mb-3" controlId="formBasicEmail">
  <Form.Label>Email</Form.Label>
    <Form.Control type="password" placeholder="Email" onChange ={e => setEmail(e.target.value)} />
    
  </Form.Group>
  <br/><br/>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
  </Form.Group>
  <Form.Group>
    <Form.Label>{success ? `Registration Succesful:${success.toString()}`:null}</Form.Label>
      </Form.Group>
  
  <Button variant="primary" type="submit" onClick={handleSubmit}>
    Register
  </Button>
  </Form>
  </div>
  </div>
</div>
    )}

export default Register;  