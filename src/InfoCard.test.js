import { render } from "@testing-library/react";
import InfoCard from "./InfoCard";

test("rendering a specified number of buttons in the body of the card", () => {
  // Arrange
  const getButtons = () => {
    return [
      <button key="1" data-testid="body-button">
        Button 1
      </button>,
      <button key="2" data-testid="body-button">
        Button 2
      </button>,
    ];
  };

  // Act
  const { getAllByTestId } = render(
    <InfoCard getButtons={getButtons}></InfoCard>
  );

  // Assert
  // Check that 2 buttons in the body of the card are rendered
  expect(getAllByTestId("body-button").length).toBe(2);
});

test("rendering a specified number of buttons next to the title of the card", () => {
  // Arrange
  const getTitleButtons = () => {
    return [
      <button key="1" data-testid="title-button">
        Button 1
      </button>,
      <button key="2" data-testid="title-button">
        Button 2
      </button>,
    ];
  };

  // Act
  const { getAllByTestId } = render(
    <InfoCard getTitleButtons={getTitleButtons}></InfoCard>
  );

  // Assert
  // Check that 2 buttons next to the title of the card are rendered
  expect(getAllByTestId("title-button").length).toBe(2);
});

test("rendering the title of the card when passing in a prop", () => {
  // Arrange
  const cardTitle = "Card Title";

  // Act
  const { getAllByTestId } = render(
    <InfoCard cardTitle={cardTitle}></InfoCard>
  );

  // Assert
  // Check that a title is rendered
  expect(getAllByTestId("card-title").length).toBe(1);
});

test("not rendering the title of the card", () => {
  // Arrange

  // Act
  const { queryAllByTestId } = render(<InfoCard></InfoCard>);

  // Assert
  // Check that no title is rendered
  expect(queryAllByTestId("card-title").length).toBe(0);
});

test("rendering the div containing the title and buttons next to the title", () => {
  // Arrange
  const cardTitle = "Card Title";

  // Act
  const { getAllByTestId } = render(
    <InfoCard cardTitle={cardTitle}></InfoCard>
  );

  // Assert
  // Check that no title is rendered
  expect(getAllByTestId("title-div").length).toBe(1);
});

test("not rendering the div containing the title and buttons next to the title", () => {
  // Arrange

  // Act
  const { queryAllByTestId } = render(<InfoCard></InfoCard>);

  // Assert
  // Check that no title is rendered
  expect(queryAllByTestId("title-div").length).toBe(0);
});
