import { render, fireEvent } from "@testing-library/react";
import Input from "./Input";

test("rendering a message that indicates input is valid", () => {
  // Arrange
  const isValid = false;

  // Act
  const { getAllByTestId } = render(<Input isValid={isValid}></Input>);

  // Assert
  // Check that there is a message that indicates input is valid
  expect(getAllByTestId("valid-message").length).toBe(1);
});

test("rendering a message that indicates input is invalid", () => {
  // Arrange
  const isValid = false;

  // Act
  const { getAllByTestId } = render(<Input isValid={isValid}></Input>);

  // Assert
  // Check that there is a message that indicates input is invalid
  expect(getAllByTestId("invalid-message").length).toBe(1);
});
