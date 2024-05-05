import { cn } from "@/lib/utils";

import Gemini from "@/public/logo/google-gemini.svg";
import Image from "next/image";
import { ModeToggle } from "../theme-toggle";

const Navbar = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-full flex items-center gap-x-4 py-3 px-4 bg-gradient-to-b from-background via-background/60 to-transparent justify-between",
        className
      )}
    >
      <Image src={Gemini} alt="Gemini" className="w-8 h-8" />
      <ModeToggle />
    </div>
  );
};
export default Navbar;
