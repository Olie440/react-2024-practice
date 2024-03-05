import { it, expect, describe } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { createRemixStub } from "@remix-run/testing";

import Index, { IndexLoaderData, loader } from "~/routes/_index";

const renderComponent = (loaderData: IndexLoaderData = {}): void => {
  const ComponentWithRemixStub = createRemixStub([
    {
      path: "/",
      Component: Index,
      loader() {
        return loaderData;
      },
    },
  ]);

  render(<ComponentWithRemixStub />);
};

describe("Index Route Component", () => {
  it("renders the header", async () => {
    renderComponent();

    await waitFor(() => {
      const headerElement = screen.getByText("Welcome to Remix");
      expect(headerElement).toBeInTheDocument();
    });
  });

  it("renders the quickstart blog tutorial link", async () => {
    renderComponent();

    await waitFor(() => {
      const linkElement = screen.getByText("15m Quickstart Blog Tutorial");

      expect(linkElement).toHaveAttribute("target", "_blank");
      expect(linkElement).toHaveAttribute("rel", "noreferrer");
      expect(linkElement).toHaveAttribute(
        "href",
        "https://remix.run/tutorials/blog"
      );
    });
  });

  it("renders the jokes app tutorial link", async () => {
    renderComponent();

    await waitFor(() => {
      const linkElement = screen.getByText("Deep Dive Jokes App Tutorial");

      expect(linkElement).toHaveAttribute("target", "_blank");
      expect(linkElement).toHaveAttribute("rel", "noreferrer");
      expect(linkElement).toHaveAttribute(
        "href",
        "https://remix.run/tutorials/jokes"
      );
    });
  });

  it("renders the docs link", async () => {
    renderComponent();

    await waitFor(() => {
      const linkElement = screen.getByText("Remix Docs");

      expect(linkElement).toHaveAttribute("target", "_blank");
      expect(linkElement).toHaveAttribute("rel", "noreferrer");
      expect(linkElement).toHaveAttribute("href", "https://remix.run/docs");
    });
  });

  it("renders the stringified loader data", async () => {
    const testLoaderData: IndexLoaderData = {
      foo: "test foo",
    };

    renderComponent(testLoaderData);

    await waitFor(() => {
      const subheadingElement = screen.getByText("Loader Data:");
      const loaderDataElement = screen.getByTestId("loader-data");

      expect(subheadingElement).toBeInTheDocument();
      expect(loaderDataElement).toHaveTextContent(
        JSON.stringify(testLoaderData)
      );
    });
  });
});

const getLoaderData = (): IndexLoaderData => {
  return loader({
    request: new Request("http://example.com"),
    params: {},
    context: {},
  }) as IndexLoaderData;
};

describe("Index Route Loader", () => {
  it("returns test data", async () => {
    expect(getLoaderData()).toEqual({ foo: "bar" });
  });
});
