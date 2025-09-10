import { Suspense } from "react";
import { BarLoader } from "react-spinners";

export default function Layout({ children }) {
  return (
    <div className="px-5">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-background to-muted/80">
            <div className="text-center space-y-4">
              <BarLoader width={800} height={7} color="#185b30" />
              <p className="text-gray-600 font-medium">Loading your complaints...</p>
            </div>
          </div>
        }
      >
        {children}
      </Suspense>
    </div>
  );
}
