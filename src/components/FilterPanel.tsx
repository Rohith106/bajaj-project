
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ConsultationType, SortOption } from "@/types";

interface FilterPanelProps {
  specialties: string[];
  selectedSpecialties: string[];
  onSpecialtyChange: (specialties: string[]) => void;
  consultationType: ConsultationType;
  onConsultationTypeChange: (type: ConsultationType) => void;
  sortOption: SortOption;
  onSortOptionChange: (option: SortOption) => void;
}

const FilterPanel = ({
  specialties,
  selectedSpecialties,
  onSpecialtyChange,
  consultationType,
  onConsultationTypeChange,
  sortOption,
  onSortOptionChange
}: FilterPanelProps) => {
  
  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      onSpecialtyChange([...selectedSpecialties, specialty]);
    } else {
      onSpecialtyChange(selectedSpecialties.filter(s => s !== specialty));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3">Sort by</h3>
        <RadioGroup 
          value={sortOption || "none"} 
          onValueChange={(value) => onSortOptionChange(value === "none" ? null : value as SortOption)}
        >
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="none" id="none" />
            <Label htmlFor="none">None</Label>
          </div>
          <div className="flex items-center space-x-2 mb-2">
            <RadioGroupItem value="fees" id="fees" />
            <Label htmlFor="fees">Price: Low-High</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="experience" id="experience" />
            <Label htmlFor="experience">Experience- Most Experience first</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Filters</h3>
        <div className="mb-4">
          <h4 className="font-medium mb-2">Specialities</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {specialties.map((specialty) => (
              <div key={specialty} className="flex items-center space-x-2">
                <Checkbox 
                  id={specialty} 
                  checked={selectedSpecialties.includes(specialty)}
                  onCheckedChange={(checked) => handleSpecialtyChange(specialty, checked === true)}
                />
                <label htmlFor={specialty} className="text-sm text-gray-600">
                  {specialty}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Mode of consultation</h4>
          <RadioGroup 
            value={consultationType} 
            onValueChange={(value) => onConsultationTypeChange(value as ConsultationType)}
          >
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="video" id="video" />
              <Label htmlFor="video">Video Consultation</Label>
            </div>
            <div className="flex items-center space-x-2 mb-2">
              <RadioGroupItem value="clinic" id="clinic" />
              <Label htmlFor="clinic">In-clinic Consultation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all" />
              <Label htmlFor="all">All</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
