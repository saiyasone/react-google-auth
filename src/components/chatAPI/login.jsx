import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Container, Button, Form } from "react-bootstrap";
// import {} from "react";

export default function LoginAPI() {
  const { errMsg, loginUser } = useAuth();
  const [fields, setFields] = useState({});

  function onSubmitForm(e) {
    e.preventDefault();
    loginUser(fields);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setFields({
      ...fields,
      [name]: value,
    });
  }
  return (
    <>
      <Container>
        <div className="text-center text-danger">
          <h5> {errMsg} </h5>
        </div>

        <div className="text-center">
          <h2>Login</h2>
        </div>
        <form onSubmit={onSubmitForm}>
          <div className="form-group mb-2">
            <label htmlFor="" className="form-label">
              Email
            </label>
            <Form.Control
              type="email"
              name="email"
              placeholder="example@gmail.com"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="" className="form-label">
              Password
            </label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="mt-4">
            <Button type="submit" className="w-100" variant="primary">
              Login
            </Button>
          </div>
        </form>
      </Container>
    </>
  );
}
