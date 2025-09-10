import { Suspense } from "react"
import { BarLoader } from "react-spinners"
import LoginLogout from "@/Elements/LoginLogout"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

import AdminFooter from "@/Elements/Admin-footer"

export default function Page({ children }) {
  return (
    <>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-3">
          {/* <SidebarTrigger /> */}
          <Separator orientation="vertical" className="mr-2 h-4" />

          {/* Breadcrumbs on the left */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">Admin</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Push login/logout button to the far right */}
          <div className="ml-auto">
            <LoginLogout />
          </div>
        </header>

        {/* Suspense wrapper for content */}
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[90vh]">
              <div className="text-center space-y-4">
                <BarLoader width={800} height={7} color="#185b30" />
                <p className="text-gray-600 font-medium">Loading dashboard...</p>
              </div>
            </div>
          }
        >
          <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
        </Suspense>
        <AdminFooter />
        </>
  )
}
