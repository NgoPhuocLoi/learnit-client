import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { authContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

function RegisterForm() {
  const { registerUser } = useContext(authContext);
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [alert, setAlert] = useState(null);

  const { username, password, confirmPassword } = registerForm;

  const handleChangeRegisterForm = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Password not match" });
      setTimeout(() => setAlert(null), 3000);
      return;
    }

    const registerData = await registerUser(registerForm);

    if (!registerData.success) {
      setAlert({ type: "danger", message: registerData.message });
      setTimeout(() => setAlert(null), 3000);
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
            value={username}
            onChange={handleChangeRegisterForm}
            required
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChangeRegisterForm}
            required
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChangeRegisterForm}
            required
          />
        </Form.Group>
        <Button
          variant="success"
          type="submit"
          className="mt-2"
          onClick={handleSubmitRegister}
        >
          Register
        </Button>
      </Form>

      <p className="mt-3">
        Don't have account?
        <Link to="/login" className="ms-2">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
}

export default RegisterForm;
