import React from "react";
import { ErrorMessage } from "formik";

function KErrorMessage({ name }) {
  return (
    <div style={{ color: "red" }}>
      <ErrorMessage name={name} />
    </div>
  );
}

export default KErrorMessage;
