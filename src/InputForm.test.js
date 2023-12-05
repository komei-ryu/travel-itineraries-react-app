import { render, fireEvent } from "@testing-library/react";
import InputForm from "./InputForm";

test("clicking on the submit button", () => {
  // Arrange
  const onSubmitClick = jest.fn((e) => e.preventDefault());

  // Act
  const { getByTestId } = render(
    <InputForm
      onSubmit={onSubmitClick}
      input={() => {}}
      onCancelClick={() => {}}
    ></InputForm>
  );

  const submitButton = getByTestId("submit-button"); // get the submit button element
  fireEvent.click(submitButton); // click on the submit button

  // Assert
  // check if the spy function for onSubmit has been called at least one time
  expect(onSubmitClick).toHaveBeenCalled();
});

test("clicking on the cancel button", () => {
  // Arrange
  const onCancelClick = jest.fn();

  // Act
  const { getByTestId } = render(
    <InputForm
      onSubmit={(e) => e.preventDefault()}
      input={() => {}}
      onCancelClick={onCancelClick}
    ></InputForm>
  );

  const cancelButton = getByTestId("cancel-button"); // get the cancel button element
  fireEvent.click(cancelButton); // click on the cancel button

  // Assert
  // check if the spy function for onSubmit has been called at least one time
  expect(onCancelClick).toHaveBeenCalled();
});
