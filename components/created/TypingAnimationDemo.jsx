import { TypingAnimation } from "@/components/magicui/typing-animation";

export function TypingAnimationDemo({ children }) {
  return (
    <TypingAnimation
      startOnView={true}
      className="text-[#185b30] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight"
    >
      {typeof children === "string" ? children : String(children)}
    </TypingAnimation>
  );
}
