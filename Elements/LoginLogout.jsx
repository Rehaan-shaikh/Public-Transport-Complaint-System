import { auth } from "@/auth"; // server-only
import LoginLogoutClient from "./LoginLogoutClient";

export default async function LoginLogout({user}) {
  const session = await auth(); // runs on server safely
  const isLoggedIn = !!session || user;

  return <LoginLogoutClient isLoggedIn={isLoggedIn} />;
}
