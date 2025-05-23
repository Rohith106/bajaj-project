
import { Doctor } from "@/types";

const API_URL = "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json";

export const fetchDoctors = async (): Promise<Doctor[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch doctors");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};

export const getAllSpecialties = (doctors: Doctor[]): string[] => {
  const specialtiesSet = new Set<string>();
  
  doctors.forEach((doctor) => {
    doctor.specialities.forEach((specialty) => {
      specialtiesSet.add(specialty.name);
    });
  });
  
  return Array.from(specialtiesSet).sort();
};
