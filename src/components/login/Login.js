import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { LOGINURL } from "../../constants/Api";


import Form from "react-bootstrap/Form";

const url = LOGINURL;

const schema = yup.object().shape({
  identifier: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function Login() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const history = useHistory();



  async function onSubmit(data) {
    setSubmitting(true);
    setLoginError(null);

    console.log(data);

    try {
        const response = await axios.post(url, data);
        console.log(response);

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
            <Form.Control name="identifier" placeholder="arshad" ref={register} />
            {errors.identifier && (
              <span className="text-danger">{errors.identifier.message}</span>
            )}
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              placeholder="password1234"
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
        </fieldset>
      </Form>
    </>
  );
}
