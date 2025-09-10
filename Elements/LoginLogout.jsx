import LoginLogoutClient from "./LoginLogoutClient";
import { getCurrentUser } from "@/Actions/User";

export default async function LoginLogout() {
  const user = await getCurrentUser();
  const isLoggedIn = !!user;

  return (
    <div>
      {/* Force stable wrapper */}
      <LoginLogoutClient isLoggedIn={isLoggedIn} />
    </div>
  );
}
