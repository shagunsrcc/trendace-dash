import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CompetitionCard } from "@/components/CompetitionCard";
import { FilterBar } from "@/components/FilterBar";
import { TrendingUp, Zap, Trophy, Users, Globe } from "lucide-react";

// Mock data for competitions
const mockCompetitions = [
  {
    id: "1",
    title: "Case Competition – StratEdge'25",
    competitionType: "Case Study Challenge",
    organizingCollege: "Institute of Management Technology (IMT), Ghaziabad",
    category: "Strategy",
    eligibility: "Open to all",
    participants: 8500,
    colleges: ["IMT", "IIM", "IIT", "BITS"],
    isHot: true,
    applyUrl: "https://unstop.com/o/9dzVWTl"
  },
  {
    id: "2",
    title: "AtomQuest 2025",
    competitionType: "Innovation & Product Challenge",
    organizingCollege: "Atomberg Technologies Pvt. Ltd.",
    category: "Innovation",
    eligibility: "Engineering Students, Postgraduates, Undergraduates",
    participants: 6200,
    colleges: ["IIT", "NIT", "BITS", "VIT"],
    isHot: true,
    applyUrl: "https://unstop.com/o/CoBpmE4"
  },
  {
    id: "3",
    title: "Branding the IMPOSSIBLE! – Naming and Tagging Competition",
    competitionType: "Branding & Creativity Challenge",
    organizingCollege: "Carrot Owl Education (OPC) Private Limited",
    category: "Branding",
    eligibility: "Engineering Students, MBA, Undergraduates, Postgraduates",
    participants: 4800,
    colleges: ["IIM", "ISB", "XLRI", "FMS"],
    isHot: false,
    applyUrl: "https://unstop.com/o/XwfLFri"
  },
  {
    id: "4",
    title: "Fluxathon: The Adaptive Leadership Challenge",
    competitionType: "Leadership & Strategy Competition",
    organizingCollege: "Indian Institute of Technology (IIT), Madras",
    category: "Leadership",
    eligibility: "Open to all",
    participants: 7300,
    colleges: ["IIT-M", "IIT-D", "IIT-B", "IIM"],
    isHot: true,
    applyUrl: "https://unstop.com/o/4KaiBDQ"
  },
  {
    id: "5",
    title: "Case Masters: Industry Solution Summit",
    competitionType: "Industry-focused Case Study",
    organizingCollege: "Indian Institute of Technology (IIT), Madras",
    category: "Case Study",
    eligibility: "Open to all",
    participants: 5900,
    colleges: ["IIT-M", "IIT-K", "NIT", "BITS"],
    isHot: false,
    applyUrl: "https://unstop.com/o/KQGjTsU"
  },
  {
    id: "6",
    title: "Chakravyuh 2.0",
    competitionType: "Business Strategy Simulation",
    organizingCollege: "Symbiosis Institute of Business Management (SIBM), Pune",
    category: "Strategy",
    eligibility: "Open to all",
    participants: 7200,
    colleges: ["SIBM", "IIM", "XIM", "FMS"],
    isHot: true,
    applyUrl: "https://unstop.com/o/nicbYXz"
  },
  {
    id: "7",
    title: "PactaNova MUN",
    competitionType: "Model United Nations Competition",
    organizingCollege: "Symbiosis Institute of Business Management (SIBM), Pune",
    category: "MUN",
    eligibility: "Open to all",
    participants: 3800,
    colleges: ["SIBM", "DU", "JNU", "IP"],
    isHot: false,
    applyUrl: "https://unstop.com/o/cP1whEk"
  },
  {
    id: "8",
    title: "Ecovate 2025",
    competitionType: "Economic Innovation Challenge",
    organizingCollege: "Symbiosis Institute of Business Management (SIBM), Pune",
    category: "Economics",
    eligibility: "Open to all",
    participants: 5600,
    colleges: ["SIBM", "ISI", "DSE", "JNU"],
    isHot: true,
    applyUrl: "https://unstop.com/o/lWD1ex2"
  },
  {
    id: "9",
    title: "Titanium Breakdown – RoboWars",
    competitionType: "Robotics Combat Competition",
    organizingCollege: "Indraprastha Institute of Information Technology (IIIT), Delhi",
    category: "Robotics",
    eligibility: "Open to all",
    participants: 4200,
    colleges: ["IIIT", "IIT", "NIT", "DTU"],
    isHot: true,
    applyUrl: "https://unstop.com/o/eWLZkz9"
  },
  {
    id: "10",
    title: "National Level Case Writing Competition",
    competitionType: "Case Writing Competition",
    organizingCollege: "Sri Balaji University, Pune, Maharashtra",
    category: "Case Study",
    eligibility: "Engineering Students, MBA, Undergraduates, Postgraduates",
    participants: 2900,
    colleges: ["SBU", "SPPU", "VIT", "MIT"],
    isHot: false,
    applyUrl: "https://unstop.com/o/KAEjPcS"
  }
];

const Index = () => {
  const [competitions, setCompetitions] = useState(mockCompetitions);
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      // Simulate participant count updates
      setCompetitions(prev => prev.map(comp => ({
        ...comp,
        participants: comp.participants + Math.floor(Math.random() * 10)
      })));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleCategoryToggle = (category: string) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      setSelectedCategories(prev => {
        const newCategories = prev.filter(c => c !== "All");
        if (prev.includes(category)) {
          const filtered = newCategories.filter(c => c !== category);
          return filtered.length === 0 ? ["All"] : filtered;
        } else {
          return [...newCategories, category];
        }
      });
    }
  };

  const filteredCompetitions = competitions.filter(comp => {
    const matchesSearch = comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comp.organizingCollege.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategories.includes("All") ||
                           selectedCategories.some(cat => 
                             comp.colleges.some(college => college.includes(cat))
                           );
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 z-10 relative">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Trending <span className="text-glow">Competitions</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Top 20 trending case competitions across DU, IIMs, IITs, BITS, NITs, 
                  and premier institutions nationwide.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  className="cta-primary text-lg px-8 py-6"
                  onClick={() => document.getElementById('live-competition-feed')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Explore Competitions
                </Button>
                <Button 
                  variant="outline" 
                  className="text-lg px-8 py-6 glass-effect"
                  onClick={() => window.open('https://wa.me/+919746960122?text=Hi!%20I%20want%20to%20get%20notifications%20about%20competitions', '_blank')}
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Get Notifications
                </Button>
              </div>

            </div>

            <div className="space-y-8 relative">
              {/* Live Trending Competitions Widget */}
              <div className="glass-effect rounded-2xl p-6 border border-border/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="live-indicator">
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold">Top Trending Now</h3>
                </div>
                
                <div className="space-y-3">
                  {competitions.slice(0, 3).map((comp, index) => (
                    <div key={comp.id} className="flex items-center gap-3 p-3 rounded-lg bg-card/50 border border-border/10">
                      <div className="text-accent font-bold text-lg">#{index + 1}</div>
                      <div>
                        <div className="font-medium text-sm">{comp.title.split(' ').slice(0, 3).join(' ')}</div>
                        <div className="text-xs text-muted-foreground">{comp.organizingCollege}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="space-y-8">
            <div className="flex items-center justify-between" id="live-competition-feed">
              <div>
                <h2 className="text-3xl font-bold mb-2">Live Competition Feed</h2>
              </div>
            </div>

            <FilterBar
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <div className="grid md:grid-cols-2 gap-6">
              {filteredCompetitions.map((competition) => (
                <CompetitionCard 
                  key={competition.id} 
                  competition={competition}
                />
              ))}
            </div>

            {filteredCompetitions.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-4">No competitions found matching your criteria</div>
                <Button 
                  className="cta-primary"
                  onClick={() => {
                    setSelectedCategories(["All"]);
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
