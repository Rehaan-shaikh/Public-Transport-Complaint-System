import { TextAnimate } from "@/components/magicui/text-animate";

export function TextAnimateDemo2({ children }) {
  return (
    <TextAnimate
      animation="blurIn"
      as="h1"
      className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight"
    >
      {children}
    </TextAnimate>
  );
}
