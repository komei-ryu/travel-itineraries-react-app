import "bootstrap/dist/css/bootstrap.css";

export default function InfoCard(props) {
  return (
    <div className="card ul-cards my-2">
      <div className="card-body">
        {(props.cardTitle || props.getTitleButtons) && (
          <div className="d-flex justify-content-star" data-testid="title-div">
            {props.cardTitle && (
              <h5
                className={`card-title mb-3 ${
                  props.getTitleButtons && "mt-2 me-5"
                }`}
                data-testid="card-title"
              >
                {props.cardTitle}
              </h5>
            )}
            {props.getTitleButtons && props.getTitleButtons()}
          </div>
        )}
        {props.children}
        {props.getButtons &&
          props.getButtons().map((button) => {
            return button;
          })}
      </div>
    </div>
  );
}
