import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FilterBarProps {
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const categories = [
  "All", "IITs", "IIMs", "BITS", "NITs", "DU", "Top Colleges"
];

export const FilterBar = ({ 
  selectedCategories, 
  onCategoryToggle, 
  searchQuery, 
  onSearchChange 
}: FilterBarProps) => {
  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search competitions..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input pl-10"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategories.includes(category) ? "default" : "secondary"}
            className={`cursor-pointer transition-all duration-200 ${
              selectedCategories.includes(category) 
                ? "cta-accent" 
                : "college-tag"
            }`}
            onClick={() => onCategoryToggle(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
};