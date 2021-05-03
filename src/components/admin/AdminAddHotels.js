import { React, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { ADDHOTELS } from "../../constants/Api";
import AuthContext from "../../context/AuthContext";
import  defaultThumbnail from "../../images/hotel-thumbnail.png";

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
  
  const [auth] = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  async function onSubmit(data) {
    const token = auth.jwt;
 
    let formData = new FormData();

    delete data["picture"];

    formData.append(`files.picture`, file, file.name);
    formData.append("data", JSON.stringify(data));

    try {
      axios.defaults.headers.common = { Authorization: `bearer ${token}` };
      await axios.post(url, formData);
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
        <img
          src={file ? URL.createObjectURL(file) : defaultThumbnail}
          alt={file ? file.name : "Default thumbnail"}
          height="100%"
          width="150px"
        />
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
