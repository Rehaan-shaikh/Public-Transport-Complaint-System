import { TextAnimateDemo2 } from "@/components/created/blurText";
import { MarqueeDemo } from "@/components/created/marquee3D";
import Parallax from "@/components/created/ScrollAnimation/Content";
import { TypingAnimationDemo } from "@/components/created/TypingAnimationDemo";
import { AnimatedGridPattern } from "@/components/magicui/animated-grid-pattern";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Public Transport Complaints",
  description: "Report a problem. We'll get back to you.",
};

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div
          className="h-[500px] sm:h-[550px] md:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden bg-cover bg-center bg-no-repeat relative shadow-xl"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1556695736-d287caebc48e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 gap-4 sm:gap-5 text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Public Transport Complaints
            </h1>
            <p className="text-base sm:text-lg md:text-xl opacity-90">
              Report a problem. We&apos;ll get back to you.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Button className="w-full sm:w-44 text-base font-semibold shadow-md hover:scale-105 transition bg-[#185b30] hover:bg-[#0b4620] text-white">
                <Link
                  href="/complaint/create"
                  className="w-full h-full inline-block text-center"
                >
                  Submit a Complaint
                </Link>
              </Button>

              <Button
                variant="outline"
                className="w-full sm:w-44 text-base font-semibold border-white text-black hover:bg-black hover:text-white hover:border transition"
              >
                <Link
                  href="/complaint"
                  className="w-full h-full inline-block text-center"
                >
                  View Complaints
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Complaint Process */}
      <section className="relative z-0 mt-20 overflow-hidden bg-gray-100 dark:bg-black py-20">
        <div className="absolute inset-0 z-0 opacity-20">
          <AnimatedGridPattern />
        </div>
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-18 flex flex-col gap-10">
          <TextAnimateDemo2 className="text-5xl font-bold">
            Step-by-Step Complaint Process
          </TextAnimateDemo2>
          
          <Parallax />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto mt-20 px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-10">
        <TypingAnimationDemo>What People Are Saying</TypingAnimationDemo>
        <MarqueeDemo />
      </section>
    </main>
  );
}
