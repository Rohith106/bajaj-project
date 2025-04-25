
import { useState } from "react";
import Header from "@/components/Header";
import FilterPanel from "@/components/FilterPanel";
import DoctorCard from "@/components/DoctorCard";
import { useQuery } from "@tanstack/react-query";
import { fetchDoctors, getAllSpecialties } from "@/utils/api";
import { toast } from "sonner";
import { ConsultationType, Doctor, SortOption } from "@/types";

const Index = () => {
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [consultationType, setConsultationType] = useState<ConsultationType>("all");
  const [sortOption, setSortOption] = useState<SortOption>(null);

  const { data: doctors, isLoading, error } = useQuery({
    queryKey: ['doctors'],
    queryFn: fetchDoctors,
  });

  // Show error toast if there was an error fetching doctors
  if (error) {
    toast.error("Failed to load doctors");
  }

  const filteredDoctors = doctors ? doctors.filter((doctor: Doctor) => {
    // Filter by consultation type
    if (consultationType !== "all") {
      if (consultationType === "video" && !doctor.video_consult) return false;
      if (consultationType === "clinic" && !doctor.in_clinic) return false;
    }

    // Filter by specialties
    if (selectedSpecialties.length > 0) {
      const doctorSpecialties = doctor.specialities.map(s => s.name);
      return selectedSpecialties.some(specialty => doctorSpecialties.includes(specialty));
    }

    return true;
  }) : [];

  // Sort doctors
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortOption === "fees") {
      // Extract numeric value from fees string (assuming format like "₹500")
      const aFees = parseInt(a.fees.replace(/[^0-9]/g, "")) || 0;
      const bFees = parseInt(b.fees.replace(/[^0-9]/g, "")) || 0;
      return aFees - bFees;
    } else if (sortOption === "experience") {
      // Extract years from experience string (assuming format like "10 years")
      const aExp = parseInt(a.experience.replace(/[^0-9]/g, "")) || 0;
      const bExp = parseInt(b.experience.replace(/[^0-9]/g, "")) || 0;
      return bExp - aExp; // Higher experience first
    }
    return 0;
  });

  // Get all unique specialties from the fetched doctors
  const allSpecialties = doctors ? getAllSpecialties(doctors) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
            <FilterPanel 
              specialties={allSpecialties}
              selectedSpecialties={selectedSpecialties}
              onSpecialtyChange={setSelectedSpecialties}
              consultationType={consultationType}
              onConsultationTypeChange={setConsultationType}
              sortOption={sortOption}
              onSortOptionChange={setSortOption}
            />
          </div>
          
          <div className="md:col-span-3">
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white p-6 rounded-lg shadow-sm animate-pulse h-40" />
                ))}
              </div>
            ) : sortedDoctors.length ? (
              <div className="space-y-4">
                {sortedDoctors.map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No doctors found matching your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
