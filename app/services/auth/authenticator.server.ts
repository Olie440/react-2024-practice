import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import User from "~/models/user";

const authenticator = new Authenticator<User>(sessionStorage);

export default authenticator;
