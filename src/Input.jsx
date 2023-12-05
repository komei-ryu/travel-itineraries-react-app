export default function Input(props) {
  return (
    <>
      <label htmlFor={props.id} className="form-label" required>
        {props.label}
      </label>
      <input
        type="text"
        className={`form-control ${props.isValid ? "is-valid" : "is-invalid"}`}
        id={props.id}
        value={props.value}
        onChange={(event) => {
          props.onChange(event);
        }}
      />
      <div className="valid-feedback" data-testid="valid-message">
        Valid input.
      </div>
      <div className="invalid-feedback" data-testid="invalid-message">
        {props.invalidMessage || "This field cannot be left empty."}
      </div>
    </>
  );
}
