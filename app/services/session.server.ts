import { createCookieSessionStorage } from "@remix-run/node";
import User from "~/models/user";

interface SessionData {
  user: User;
}

interface SessionFlashData {
  error: string;
}

const { SESSION_SECRET, PREVIOUS_SESSION_SECRET } = process.env;
if (SESSION_SECRET === undefined) {
  throw new Error("session secret is missing");
}

const secrets = [process.env.SESSION_SECRET];

if (PREVIOUS_SESSION_SECRET) {
  secrets.push(PREVIOUS_SESSION_SECRET);
}

export const sessionStorage = createCookieSessionStorage<
  SessionData,
  SessionFlashData
>({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 60,
    path: "/",
    sameSite: "lax",
    secrets,
    secure: true,
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
