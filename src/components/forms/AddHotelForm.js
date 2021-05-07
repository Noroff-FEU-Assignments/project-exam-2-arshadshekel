import { React, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { ADDHOTELS } from "../../constants/Api";
import AuthContext from "../../context/AuthContext";
import defaultThumbnail from "../../images/hotel-thumbnail.png";

const url = ADDHOTELS;

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your first name")
    .min(2, "The name must be at least 2 characters"),
  phone: yup
    .string()
    .required("Please enter your last name")
    .min(2, "The name must be at least 2 characters"),
  class: yup
    .number()
    .required("Please enter a class")
    .positive()
    .integer()
    .max(5, "The class must be maximum 5 stars"),
  description: yup
    .string()
    .required("Please enter your message")
    .min(10, "The message must be at least 10 characters"),
  picture: yup
    .mixed()
    .test("fileExists", "Please upload a file", (value) => !!value.length),
});

function AddHotelForm() {
  const [auth] = useContext(AuthContext);
  const [file, setFile] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleInputChange = (event) => {
    setFile(event.target.files[0]);
  };

  async function onSubmit(data) {
    // get JWT token from localstorage
    const token = auth.jwt;
    console.log(data);

    // Create new formData object to hold data to send in API call
    let formData = new FormData();

    //Delete picture file which gets attached during yup validation
    delete data["picture"];

    //Append picture and data
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
          <Form.Label>Hotel name</Form.Label>
          <Form.Control placeholder="Hotel name" name="name" ref={register} />
          {errors.name && (
            <span className="text-danger">{errors.name.message}</span>
          )}
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput2">
          <Form.Label>Phone</Form.Label>
          <Form.Control placeholder="phone" name="phone" ref={register} />
          {errors.phone && (
            <span className="text-danger">{errors.phone.message}</span>
          )}
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput3">
          <Form.Label>Class</Form.Label>
          <Form.Control placeholder="class" name="class" ref={register} />
          {errors.class && (
            <span className="text-danger">{errors.class.message}</span>
          )}
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            placeholder="Please enter a message"
            ref={register}
          />
          {errors.description && (
            <span className="text-danger">{errors.description.message}</span>
          )}
        </Form.Group>

        <Form.Check
          custom
          type="checkbox"
          name="featured"
          id="featured"
          label="featured?"
          ref={register}
        />

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

export default AddHotelForm;