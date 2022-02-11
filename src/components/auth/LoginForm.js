import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { authContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const { loginUser } = useContext(authContext);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const loginForm = { username, password };

    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setAlert({ type: "danger", message: loginData.message });
        setTimeout(() => setAlert(null), 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form>
        <AlertMessage info={alert} />
        <Form.Group className="mt-4">
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="success"
          type="submit"
          className="mt-2"
          onClick={handleSubmitLogin}
        >
          Login
        </Button>
      </Form>

      <p className="mt-3">
        Don't have account?
        <Link to="/register" className="ms-2">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
}

export default LoginForm;
