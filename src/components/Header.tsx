
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="bg-[#2962b9] py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search Symptoms, Doctors, Specialists, Clinics"
            className="w-full pl-10 pr-4 py-2 rounded-lg border-0 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default Header;
