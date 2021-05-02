import { React, useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button"; 
import axios from "axios";
import {CONTACTURL} from "../../constants/Api"


const url = CONTACTURL;

const schema = yup.object().shape({
    Firstname: yup
        .string()
        .required("Please enter your first name")
        .min(3, "The message must be at least 3 characters"),
    Lastname: yup
        .string()
        .required("Please enter your last name")
        .min(4, "The message must be at least 4 characters"),
    email: yup
        .string()
        .required("Please enter an email address")
        .email("Please enter a valid email address"),
    Message: yup
        .string()
        .required("Please enter your message")
        .min(10, "The message must be at least 10 characters"),
});

function AdminAddHotels() {
    const [auth,] = useContext(AuthContext);
    const token = auth.jwt;
      const [submitting, setSubmitting] = useState(false);
      const [contactError, setContactError] = useState(null);

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });

    async function onSubmit(data) {
           setSubmitting(true);
           setContactError(null);
    
    try {
       await axios.post(url, data);
    } catch (error) {
      console.log("error", error);
      setContactError(error.toString());
    } finally {
      setSubmitting(false);
    }
    }

    console.log(errors);



    return (
      <div className="container">
        <h1 className="text-center">Contact us</h1>

        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>First name</Form.Label>
            <Form.Control
              placeholder="Firstname"
              name="Firstname"
              ref={register}
            />
            {errors.Firstname && (
              <span className="text-danger">{errors.Firstname.message}</span>
            )}
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput2">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              placeholder="Lastname"
              name="Lastname"
              ref={register}
            />
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
              ref={register}
            />
            {errors.Message && (
              <span className="text-danger">{errors.Message.message}</span>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            {submitting ? "Submitting..." : "Submit"}
          </Button>
        </Form>
      </div>
    );
}

export default AdminAddHotels;



