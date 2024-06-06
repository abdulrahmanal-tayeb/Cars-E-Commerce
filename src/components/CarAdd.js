import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Message from './utils/Message';
import { Button } from '@mui/joy';
import { toast } from 'react-toastify';

const CarAdd = () => {
    const [mode, setMode] = useState(null);
    const [createdOffer, setCreatedOffer] = useState(null);
    const navigate = useNavigate();
    const initialValues = {
        title: "",
        brand: "",
        seller: "",
        description: "",
        model: new Date().getFullYear(),
        price: 0,
        state: "",
        mainImage: null,
        images: null,
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        brand: Yup.string().required('Brand is required'),
        seller: Yup.string().required('Seller name is required'),
        description: Yup.string().required('Description is required'),
        model: Yup.number().integer("Sorry, what year is this?").positive("BC?").min(1099, "Cars didn't exist at that time.").max(new Date().getFullYear() + 1, "Year cannot be in the future."),
        price: Yup.number().required('Price is required').positive('Price must be a positive number'),
        state: Yup.string().oneOf(["Impacted", "New"]).required("State must be either \"Impacted\" or \"New\""),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        setCreatedOffer(values);
        setMode("complete");
    };

    const handleImageUpload = ({ target }) => {
        if (target.files.length > 5) {
            target.value = null;
            return toast.error("5 Files maximum are allowed.");
        }
    }

    switch (mode) {
        case "complete":
            return <Message>
                <div className="p-3" style={{ textAlign: "center" }}>
                    <h1>Offer is Now Public!</h1>
                    <p>
                        Your offer (<strong>{createdOffer.title}</strong>) has been created and is now visible to every creature in the world!
                    </p>
                    <p><strong>Unfortunatley, no backend is available to actually store this offer.</strong></p>
                    <div style={{ textAlign: "center" }}>
                        <div className='flexed-centered'>
                            <Button
                                variant="solid"
                                size="md"
                                color="primary"
                                sx={{ alignSelf: 'center', fontWeight: 600 }}
                                onClick={() => navigate("/")}
                            >
                                Close
                            </Button>
                        </div>

                    </div>
                </div>
            </Message>
        default:
            return (
                <div className="container my-5">
                    <h1 className="mb-4">Offer Form</h1>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div className='flexed-centered' style={{ flexWrap: "wrap", justifyContent: "flex-start" }}>

                                    {[
                                        {
                                            label: "Seller Name",
                                            field: "seller",
                                        },
                                        {
                                            label: "Title",
                                            field: "title"
                                        },
                                        {
                                            label: "Brand",
                                            field: "brand"
                                        },
                                        {
                                            label: "Description",
                                            field: "description",
                                        },
                                        {
                                            label: "Price",
                                            field: "price",
                                            type: "number"
                                        },

                                        {
                                            label: "Model",
                                            field: "model",
                                            type: "number"
                                        },
                                    ].map(({ field, label, type, placeholder }) => (
                                        <div className="form-group mb-3">
                                            <label htmlFor={field} className="form-label">{label}</label>
                                            <Field type={type ?? "text"} className="form-control" id={field} name={field} placeholder={placeholder} />
                                            <ErrorMessage name={field} component="div" className="text-danger" />
                                        </div>
                                    ))}


                                    <div className="form-group mb-3">
                                        <Field
                                            as="select"
                                            id="State"
                                            name="state"
                                            className="form-control"
                                            placeholder="State"
                                        >
                                            <option value={-1}>Car State</option>
                                            <option value="New">New</option>
                                            <option value="Impacted">Impacted</option>
                                        </Field>
                                        <ErrorMessage name={"state"} component="div" className="text-danger" />
                                        {/* <select name="state" className='form-select'>
                                        </select> */}
                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="mainImage" className="form-label">Main Image</label>
                                        <input className='form-control' type="file" accept="image/*" name="mainImage" required />
                                        <ErrorMessage name={"mainImage"} component="div" className="text-danger" />

                                    </div>
                                    <div className="form-group mb-3">
                                        <label htmlFor="images" className="form-label">More Images</label>
                                        <input onChange={handleImageUpload} className='form-control' type="file" accept="image/*" name="images" required multiple/>
                                        <ErrorMessage name={"images"} component="div" className="text-danger" />
                                    </div>
                                    <div className='col-12'>
                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                            Submit{isSubmitting && "ting..."}
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            );
    }
};

export default CarAdd;