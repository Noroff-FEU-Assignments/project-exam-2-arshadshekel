import { React, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { ADDHOTELS } from "../../constants/Api";
import AuthContext from "../../context/AuthContext";

const url = ADDHOTELS;

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your first name")
    .min(2, "The name must be at least 2 characters"),
  /*   Lastname: yup
    .string()
    .required("Please enter your last name")
    .min(2, "The name must be at least 2 characters"),
  email: yup
    .string()
    .required("Please enter an email address")
    .email("Please enter a valid email address"),
  Message: yup
    .string()
    .required("Please enter your message")
    .min(10, "The message must be at least 10 characters"), */
  picture: yup
    .mixed()
    .test("fileExists", "Please upload a file", (value) => !!value.length),
});

function AdminAddHotels() {
  const [submitted, setSubmitted] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  async function onSubmit(data) {
    const token = auth.jwt;
    console.log(file);
    console.log(token);

    let formData = new FormData();

    delete data["picture"];

    formData.append(`files.picture`, file, file.name);
    formData.append("data", JSON.stringify(data));

    const options = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await fetch(url, options);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="container">
      <h1 className="text-center">Contact us</h1>

      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>First name</Form.Label>
          <Form.Control placeholder="Firstname" name="name" ref={register} />
          {errors.name && (
            <span className="text-danger">{errors.name.message}</span>
          )}
        </Form.Group>
        {/*  <Form.Group controlId="exampleForm.ControlInput2">
          <Form.Label>Last name</Form.Label>
          <Form.Control placeholder="Lastname" name="Lastname" ref={register} />
          {errors.Lastname && (
            <span className="text-danger">{errors.Lastname.message}</span>
          )}
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput3">
          <Form.Label>Email</Form.Label>
          <Form.Control placeholder="Email" name="email" ref={register} />
          {errors.email && (
            <span className="text-danger">{errors.email.message}</span>
          )}
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="Message"
            placeholder="Please enter a message"
            ref={register}
          />
          {errors.Message && (
            <span className="text-danger">{errors.Message.message}</span>
          )}
        </Form.Group> */}
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label className="custom-file-upload">File</Form.Label>

          <Form.Control
            name="picture"
            type="file"
            ref={register}
            onChange={handleInputChange}
          />
          {errors.picture && (
            <span className="text-danger">{errors.picture.message}</span>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default AdminAddHotels;
