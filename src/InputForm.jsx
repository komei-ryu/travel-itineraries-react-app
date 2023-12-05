import "bootstrap/dist/css/bootstrap.css";

export default function InputForm(props) {
  return (
    <form
      onSubmit={(event) => props.onSubmit(event)}
      className="needs-validation"
      noValidate
    >
      <div className="fw-bold mx-4 mb-3">{props.input()}</div>
      <div className="d-flex justify-content-evenly">
        <button
          type="submit"
          className="btn btn-primary mx-5"
          data-testid="submit-button"
        >
          Submit
        </button>
        <button
          type="button"
          className="btn btn-warning mx-5"
          onClick={(event) => {
            props.onCancelClick(event);
          }}
          data-testid="cancel-button"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
