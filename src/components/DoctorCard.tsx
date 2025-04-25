
import React from "react";
import { Doctor } from "@/types";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, Video } from "lucide-react";

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border mb-4">
      <div className="flex gap-4">
        <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
          <img
            src={doctor.photo || "https://placehold.co/80x80/9b87f5/ffffff?text=Dr"}
            alt={doctor.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "https://placehold.co/80x80/9b87f5/ffffff?text=Dr";
            }}
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">
            {doctor.name}
          </h3>
          <p className="text-gray-600 mb-1">{doctor.specialities[0]?.name || "General Physician"}</p>
          <p className="text-sm text-gray-500 mb-2">
            {doctor.experience}
          </p>
          
          <div className="flex items-center gap-4 mb-2">
            {doctor.video_consult && (
              <div className="flex items-center gap-1 text-sm text-blue-600">
                <Video className="h-4 w-4" />
                <span>Online</span>
              </div>
            )}
            {doctor.in_clinic && (
              <div className="flex items-center gap-1 text-sm text-green-600">
                <Building2 className="h-4 w-4" />
                <span>In-clinic</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Building2 className="h-4 w-4" />
            <span>{doctor.clinic.name}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <span>{doctor.clinic.address.locality}, {doctor.clinic.address.city}</span>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <div className="text-lg font-semibold">{doctor.fees}</div>
          <Button className="w-full">Book Appointment</Button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
