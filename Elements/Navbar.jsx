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
import { Menu } from "lucide-react"; // for hamburger icon
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Create Complaint", href: "/complaint/create" },
  { name: "Track Complaints", href: "/complaint" },
  { name: "Contact", href: "/contact" },
];

export default async function Navbar() {
  const linksToShow = [...NAV_LINKS];

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
          MyLogo!
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

        {/* Auth Buttons (Desktop) */}
        <div className="hidden sm:flex items-center gap-4">
          <LoginLogout />
        </div>

        {/* Mobile Menu */}
<div className="md:hidden">
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent">
        <Menu className="h-6 w-6" />
      </Button>
    </SheetTrigger>
    <SheetTitle></SheetTitle>
    <SheetContent
      side="right"
      className="w-72 px-6 py-6 flex flex-col bg-background shadow-lg"
    >
      {/* Drawer Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-semibold text-foreground">Menu</h2>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-3">
        {linksToShow.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Divider */}
      <div className="my-6 border-t border-border" />

      {/* Auth Buttons */}
      <div className="mt-auto">
        <LoginLogout />
      </div>
    </SheetContent>
  </Sheet>
</div>

      </div>
    </header>
  );
}
