import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addContactThunk } from "../../redux/contacts/operations";
import s from "./ContactForm.module.css";

const initialValues = {
  name: "",
  number: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Min 3 characters")
    .max(50, "Max 50 characters")
    .required("This field is required"),
  number: Yup.string()
    .min(3, "Min 3 characters")
    .max(50, "Max 50 characters")
    .required("This field is required"),
});

const ContactForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(addContactThunk(values));
    actions.resetForm();
    toast.success("Contact created successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      theme: "light",
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={s.form}>
        <label>
          <h3>Name</h3>
          <Field type="text" name="name" className={s.formInput} />
          <ErrorMessage name="name" component="p" className={s.error} />
        </label>
        <label>
          <h3>Phone number</h3>
          <Field type="text" name="number" className={s.formInput} />
          <ErrorMessage name="number" component="p" className={s.error} />
        </label>
        <button type="submit" className={s.buttonAddContact}>
          Add Contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
