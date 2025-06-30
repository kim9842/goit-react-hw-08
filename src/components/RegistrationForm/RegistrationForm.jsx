import { Field, Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import s from "./RegistrationForm.module.css";
import { registrationThunk } from "../../redux/auth/operations";

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async ({ name, email, password }, actions) => {
    try {
      await dispatch(registrationThunk({ name, email, password })).unwrap();
      toast("Registered successfully");
    } catch {
      toast("Registration failed. Please try again.");
    }
    actions.resetForm();
  };

  return (
    <div className={s.formWrapper}>
      <h1 className={s.header}>Register Your Account</h1>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={s.form}>
          <label>
            <span className={s.label}>Name</span>
            <Field name="name" className={s.input} />
          </label>
          <label>
            <span className={s.label}>Email</span>
            <Field name="email" className={s.input} />
          </label>
          <label>
            <span className={s.label}>Password</span>
            <Field name="password" className={s.input} type="password" />
          </label>
          <button type="submit" className={s.button}>
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationForm;
