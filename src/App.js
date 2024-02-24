import { Field, FieldArray, Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import KErrorMessage from "./components/KErrorMessage";

const validationCheck = yup.object({
  name: yup.string().required("Name is Required"),
  phone: yup
    .number()
    .min(1000000000, "Not valid phone no")
    .max(9999999999, "Not Valid Phone no")
    .required("Number is Required"),
  password: yup
    .string()
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      "Must contain 8 Character,one Upper Case,ONe lowerCase,One Number and one special case character"
    )
    .required("Password is required"),
  gender: yup.string().required("Gender is Required"),
  date: yup.date().required("Date of Birth is Required"),
  income: yup.string().required("income is Required"),
  social: yup
    .array()
    .of(
      yup
        .string("String is required")
        .min(4, "Too Short")
        .max(20, "Too Long")
        .required("")
    )
    .min(1, "Atleast one social media is required!")
    .required("Required"),
  hobbies: yup
    .array()
    .of(
      yup
        .string("String is required")
        .min(4, "Too Short")
        .max(20, "Too Long")
        .required("")
    )
    .min(1, "Atleast one Hobbies is required!")
    .required("Required"),
});
export default function App() {
  return (
    <div className="Main-Container">
      <Formik
        validationSchema={validationCheck}
        initialValues={{
          name: "",
          phone: "",
          password: "",
          gender: "",
          date: "",
          income: "",
          social: [],
          hobbies: [],
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form>
            <label className="label">Name:</label>
            <Field className="field" name="name" type="text" />
            <br />
            <br />
            <KErrorMessage name="name" />
            <br />
            <br />
            <label className="label">Phone:</label>
            <Field className="field" name="phone" type="number" />
            <br />
            <KErrorMessage name="phone" />
            <br />
            <label className="label">Password:</label>
            <Field className="field" name="password" type="password" />
            <br />
            <KErrorMessage name="password" />
            <br />
            <label className="label">Gender:</label>
            <br />
            <label className="label">Male:</label>
            <Field className="field" name="gender" value="male" type="radio" />
            <br />
            <KErrorMessage name="gender" />
            <br />
            <label className="label">female:</label>
            <br />
            <Field
              className="field"
              name="gender"
              value="female"
              type="radio"
            />
            <br />
            <br />
            <label className="label">Date:</label>
            <Field className="field" name="date" type="date" />
            <br />
            <KErrorMessage name="date" />
            <br />
            <label className="label">Income:</label>
            <br />
            <br />
            <Field className="field" name="income" as="select">
              <br />
              <KErrorMessage name="income" />
              <br />
              <option value="0">0</option>
              <option value="1000">1000</option>
              <option value="2000">2000</option>
            </Field>
            <br />
            <br />
            <label className="label">Social:</label>
            <br />
            <KErrorMessage name="social" />
            <br />
            <label className="label">facebook:</label>
            <Field className="field" name="social[0]" type="text" />
            <br />
            <KErrorMessage name="social.0" />
            <br />
            <br />
            <br />
            <label className="label">Twitter:</label>
            <Field className="field" name="social[1]" type="text" />
            <KErrorMessage name="social.1" />
            <br />
            <br />
            <FieldArray
              name="hobbies"
              render={(arrayHelpers) => (
                <div>
                  {values.hobbies && values.hobbies.length > 0 ? (
                    values.hobbies.map((hobby, index) => (
                      <div key={index}>
                        <Field name={`hobbies.${index}`} />
                        <KErrorMessage name={`hobbies.${index}`} />
                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          -
                        </button>{" "}
                        <button
                          type="button"
                          onClick={() => arrayHelpers.insert(index, "")}
                        >
                          +
                        </button>
                      </div>
                    ))
                  ) : (
                    <button
                      type="button"
                      onClick={() => arrayHelpers.push(" ")}
                    >
                      add hobbies
                    </button>
                  )}
                </div>
              )}
            />
            <KErrorMessage name={`hobbies`} />
            <br />
            <button type="submit">submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
