// app/components/Navbar.jsx
import { motion } from "framer-motion";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import LoginLogout from "./LoginLogout";
import { getCurrentUser } from "@/Actions/User";
import { Leaf } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Create Complaint", href: "/complaint/create" },
  { name: "Track Complaints", href: "/complaint" },
  { name: "Contact", href: "/contact" },
];

export default async function Navbar() {
  const user = await getCurrentUser();
  const isAdmin = user?.success && user.decoded?.role === "admin";

  // Links to show
  const linksToShow = [...NAV_LINKS];
  if (isAdmin) {
    linksToShow.push({ name: "Dashboard", href: "/dashboard" });
  }

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-xl 
                  text-[#185b30] hover:text-[#144d29] 
                    font-extrabold text-xl tracking-wide 
                  shadow-md hover:shadow-lg transition-all duration-300"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="w-7 h-7"
            fill="currentColor"
          >
            {/* Shield */}
            <path d="M12 2c-3.5 1.5-7 2-10 2v6c0 5.9 3.9 11 10 12 6.1-1 10-6.1 10-12V4c-3 0-6.5-.5-10-2z" />
            {/* Chat bubble */}
            <path
              d="M7.2 9.2c0-1.1.9-2 2-2h5.6c1.1 0 2 .9 2 2v3.1c0 1.1-.9 2-2 2h-2.3l-2.2 1.7c-.4.3-.9 0-.9-.5v-1.2H9.2c-1.1 0-2-.9-2-2V9.2z"
              fill="white"
              opacity=".9"
            />
            {/* Exclamation */}
            <rect
              x="11.25"
              y="9.6"
              width="1.5"
              height="3.3"
              rx=".5"
              fill="#185b30"
            />
            <rect
              x="11.25"
              y="13.6"
              width="1.5"
              height="1.5"
              rx=".75"
              fill="#185b30"
            />
          </svg>
          MyLogo
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="flex gap-6">
            {linksToShow.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuLink
                  className="text-muted-foreground transition hover:text-foreground"
                  href={item.href}
                >
                  {item.name}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Buttons */}
        <div className="hidden sm:flex items-center gap-4">
          <LoginLogout user={user} />
        </div>
      </div>
    </header>
  );
}
