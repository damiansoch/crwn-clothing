import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      <input className="form-input" {...otherProps} />
      {/* if label exists render the label */}
      {label && (
        <label
          className={`${
            // if there is a lenght append the shrink class */}

            otherProps.value.lenght ? "shrink" : ""
          }form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};
export default FormInput;
