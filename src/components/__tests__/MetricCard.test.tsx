import { render, screen } from "@testing-library/react-native";
import MetricCard from "../MetricCard";

describe("MetricCard", () => {
  it("renders the label, value, unit and status badge", () => {
    render(
      <MetricCard label="Hemoglobin" value={13.5} unit="g/dL" status="optimal" />,
    );

    expect(screen.getByText("HEMOGLOBIN")).toBeOnTheScreen();
    expect(screen.getByText(/13\.5/)).toBeOnTheScreen();
    expect(screen.getByText(/g\/dL/)).toBeOnTheScreen();
    expect(screen.getByText("optimal")).toBeOnTheScreen();
  });

  it("shows the change row only when a change is provided", () => {
    const { rerender } = render(
      <MetricCard label="Ferritin" value={44} status="warning" change="-12%" />,
    );

    expect(screen.getByText("-12%")).toBeOnTheScreen();
    expect(screen.getByText("vs last month")).toBeOnTheScreen();

    rerender(<MetricCard label="Ferritin" value={44} status="warning" />);

    expect(screen.queryByText("vs last month")).toBeNull();
  });
});
