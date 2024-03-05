import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import styled from "@emotion/styled";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export interface IndexLoaderData {
  foo?: string;
}

export const loader: LoaderFunction = (): IndexLoaderData => {
  return {
    foo: "bar",
  };
};

export default function Index() {
  const loaderData = useLoaderData<IndexLoaderData>();

  return (
    <Container>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>

      <section>
        <h2>Loader Data:</h2>
        <p data-testid="loader-data">{JSON.stringify(loaderData)}</p>
      </section>
    </Container>
  );
}

const Container = styled.div`
  font-family: system-ui, sans-serif;
  line-height: 1.8;
`;
