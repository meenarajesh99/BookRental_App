import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';



function Profile() {
    return (
       
<div>
      <div className="container">
        <div className="small-container">
<Form>

      <h1>Profile</h1>
      <br/><br/><br/><br/>
          <Form.Group className="mb-3" controlId="formUserName">
            <Form.Label>User Name</Form.Label>
            <Form.Control type="text" placeholder="Enter username" />
            <br/>
          </Form.Group>
            <br/>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
             />
          </Form.Group>
          <br/>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" placeholder="Enter username" 
            />
            <br/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            
          </Form.Group>
          <br/>
          <Button variant="primary" type="submit">
            Edit
          </Button>
        </Form>
        </div>
        </div>
        </div>
        )}

export default Profile;