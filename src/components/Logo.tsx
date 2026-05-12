import { cn } from "../lib/utils";

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

export default function Logo({ className, inverted = false }: LogoProps) {
  // If the user uploads logo.png to the public folder, this will work.
  // The new logo is white on black, so we don't need invert by default.
  return (
    <img 
      src="/logo.png" 
      alt="Untamed Logo" 
      className={cn(
        "w-full h-full object-contain transition-all",
        inverted && "invert",
        className
      )}
      onError={(e) => {
         // Fallback if image doesn't exist yet
         e.currentTarget.style.display = 'none';
         if (e.currentTarget.parentElement) {
            const fallback = document.createElement('span');
            fallback.innerText = 'U';
            fallback.className = 'font-black text-2xl';
            e.currentTarget.parentElement.appendChild(fallback);
         }
      }}
    />
  );
}
