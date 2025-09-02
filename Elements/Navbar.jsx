// app/components/Navbar.jsx
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import LoginLogout from "./LoginLogout";
import { getCurrentUser } from "@/Actions/User";

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
          className="text-teal-600 dark:text-teal-300 font-bold text-lg"
          href="/"
        >
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
