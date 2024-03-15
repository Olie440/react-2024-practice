import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import { Theme } from "@radix-ui/themes";
import { useHydrateAtoms } from "jotai/utils";

import { userAtom } from "~/atoms";
import User from "~/models/user";
import { findUser } from "~/utils/user.server";
import { getSession } from "~/services/session.server";
import { prisma } from "~/services/db.server";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

interface RootLoaderData {
  user?: User;
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getSession(request.headers.get("Cookie"));
  const user = session.get("user");

  return json<RootLoaderData>({
    user,
  });
};

export default function App() {
  const { user } = useLoaderData<RootLoaderData>();
  useHydrateAtoms([[userAtom, user]]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Theme>
          <Outlet />
        </Theme>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
