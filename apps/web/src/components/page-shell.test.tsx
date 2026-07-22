import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PageShell } from "./page-shell";

describe("PageShell", () => {
  it("renders the heading and description", () => {
    render(
      <PageShell kicker="Test" title="Scaffold page" description="This page is structural." />
    );

    expect(screen.getByRole("heading", { name: "Scaffold page" })).toBeInTheDocument();
    expect(screen.getByText("This page is structural.")).toBeInTheDocument();
  });
});
