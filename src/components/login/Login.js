import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { LOGINURL } from "../../constants/Api";
import Form from "react-bootstrap/Form";
import AuthContext from "../../context/AuthContext";

const url = LOGINURL;

const schema = yup.object().shape({
  identifier: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function Login({ handleClose }) {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const [, setAuth] = useContext(AuthContext);

  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);
    
    try {
      await axios.post(url, data).then((response) => {
        if (response.status === 200) {
          handleClose();
          setAuth(response.data);
        }
      });
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {loginError && (
        <span className="text-danger text-bold">Login failed</span>
      )}
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={submitting}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="identifier"
              placeholder="admin@admin.com"
              ref={register}
            />
            {errors.identifier && (
              <span className="text-danger">{errors.identifier.message}</span>
            )}
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              placeholder="Pass1234"
              ref={register}
              type="password"
            />
            {errors.password && (
              <span className="text-danger">{errors.password.message}</span>
            )}
          </Form.Group>
          <button className="btn btn-primary">
            {submitting ? "Loggin in..." : "Login"}
          </button>
          <button
            variant="secondary"
            className="btn btn-secondary ml-3"
            onClick={handleClose}
          >
            Close
          </button>
        </fieldset>
      </Form>
    </>
  );
}
