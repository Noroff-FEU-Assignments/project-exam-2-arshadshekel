import { useParams, useHistory } from "react-router-dom";
import { React, useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { ADDHOTELS } from "../../constants/Api";
import AuthContext from "../../context/AuthContext";

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
  price: yup.number().required("Please enter a price").positive().integer(),
});

function EditHotelForm() {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const url = ADDHOTELS + id;
  const [show, setShow] = useState(false);
  const [auth] = useContext(AuthContext);
  const [file, setFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let history = useHistory();

  useEffect(
    function () {
      async function fetchData() {
        try {
          const response = await fetch(url);

          if (response.ok) {
            const json = await response.json();
            console.log(json);
            setHotel(json);
            setFile(json.picture);
          } else {
            setError("An error occured");
          }
        } catch (error) {
          setError(error.toString());
        } finally {
          setLoading(false);
        }
      }
      fetchData();
    },
    [url]
  );

  async function onSubmit(data) {
    // get JWT token from localstorage
    const token = auth.jwt;

    console.log(data);

    // Create new formData object to hold data to send in API call
    let formData = new FormData();

    //Delete picture file which gets attached during yup validation
    delete data["picture"];

    //Append picture and data
    if (uploadedFile) {
      formData.append(`files.picture`, uploadedFile, uploadedFile.name);
    }
    formData.append("data", JSON.stringify(data));

    try {
      axios.defaults.headers.common = { Authorization: `bearer ${token}` };
      await axios.put(url, formData);
    } catch (error) {
      console.log("error", error);
    }
  }

  if (loading) {
    return <div className="mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="mt-5">An error occured: {error}</div>;
  }

  function handleChange(event, field) {
    if (field === "name") {
      hotel.name = event.target.value;
    }
  }

  async function deleteItem() {
    const token = auth.jwt;

    try {
      axios.defaults.headers.common = { Authorization: `bearer ${token}` };
      await axios.delete(url, {}).then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          handleClose();
          history.push("/hotels");
        }
      });
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleFileChange = (event) => {
    setUploadedFile(event.target.files[0]);
  };

  return (
    <div className="mt-5">
      <Form noValidate onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Label>Hotel name</Form.Label>
          <Form.Control
            placeholder="Hotel name"
            name="name"
            ref={register}
            defaultValue={hotel.name}
            onChange={handleChange("name")}
          />
          {errors.name && (
            <span className="text-danger">{errors.name.message}</span>
          )}
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlInput2">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            placeholder="phone"
            name="phone"
            ref={register}
            defaultValue={hotel.phone}
            onChange={handleChange("phone")}
          />
          {errors.phone && (
            <span className="text-danger">{errors.phone.message}</span>
          )}
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput3">
          <Form.Label>Class</Form.Label>
          <Form.Control
            placeholder="class"
            name="class"
            ref={register}
            defaultValue={hotel.class}
            onChange={handleChange("class")}
          />
          {errors.class && (
            <span className="text-danger">{errors.class.message}</span>
          )}
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlInput3">
          <Form.Label>Price</Form.Label>
          <Form.Control placeholder="price" name="price" ref={register} />
          {errors.price && (
            <span className="text-danger">{errors.price.message}</span>
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
            defaultValue={hotel.description}
            onChange={handleChange("description")}
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
          defaultChecked={hotel.featured}
          ref={register}
        />

        <img
          src={uploadedFile ? URL.createObjectURL(uploadedFile) : file.url}
          alt={uploadedFile ? uploadedFile.name : file.name}
          height="100%"
          width="150px"
        />
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label className="custom-file-upload">File</Form.Label>

          <Form.Control
            name="picture"
            type="file"
            ref={register}
            onChange={handleFileChange}
          />
          {errors.picture && (
            <span className="text-danger">{errors.picture.message}</span>
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="danger" className=" ml-3" onClick={handleShow}>
          Delete item
        </Button>
      </Form>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Logout?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you wish to log out?</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={deleteItem}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditHotelForm;
