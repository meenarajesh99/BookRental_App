import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function login(){
    return(

    <div>

<Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>User Name</Form.Label>
    <Form.Control type="username" placeholder="Enter username" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Remember me" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</div>
)}

export default login;
    