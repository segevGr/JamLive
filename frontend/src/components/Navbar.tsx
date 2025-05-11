import { Music, User } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-primary text-textOnDark flex items-center justify-between px-6 py-4 shadow-md">
      <div className="flex items-center gap-2">
        <Music className="text-gold" />
        <span className="font-bold text-lg text-gold">JAMOVEO</span>
      </div>
      <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
        <User className="text-primary" />
      </div>
    </header>
  );
};

export default Navbar;
