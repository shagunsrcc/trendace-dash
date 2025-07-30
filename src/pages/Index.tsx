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
    title: "Global Business Strategy Challenge 2024",
    organizingCollege: "IIM Ahmedabad",
    category: "Strategy",
    prizePool: "₹5,00,000",
    registrationDeadline: "March 15, 2024",
    eligibility: "Open to UG/PG students from all premier institutions including IITs, IIMs, BITS, NITs, and DU colleges",
    participants: 12500,
    colleges: ["IIM-A", "IIM-B", "IIT-D", "BITS"],
    isHot: true
  },
  {
    id: "2", 
    title: "Fintech Innovation Case Competition",
    organizingCollege: "IIT Delhi",
    category: "Finance",
    prizePool: "₹3,00,000",
    registrationDeadline: "March 20, 2024",
    eligibility: "UG students from engineering and management backgrounds. Teams of 3-4 members allowed",
    participants: 8900,
    colleges: ["IIM-C", "XLRI", "ISB", "DU"],
    isHot: true
  },
  {
    id: "3",
    title: "Sustainable Energy Solutions Challenge",
    organizingCollege: "IIT Bombay",
    category: "Energy",
    prizePool: "₹4,00,000",
    registrationDeadline: "March 25, 2024",
    eligibility: "Open to all UG and PG students from technical institutes. Focus on renewable energy solutions",
    participants: 6700,
    colleges: ["IIT-B", "IIT-M", "NIT-T", "BITS"],
    isHot: false
  },
  {
    id: "4",
    title: "Digital Transformation Case Study",
    organizingCollege: "IIM Bangalore",
    category: "Technology",
    prizePool: "₹2,50,000",
    registrationDeadline: "March 30, 2024",
    eligibility: "MBA/PGDM students and final year UG students from premier institutions across India",
    participants: 15200,
    colleges: ["IIT-KGP", "IIM-L", "BITS", "NIT-K"],
    isHot: true
  },
  {
    id: "5",
    title: "Healthcare Innovation Challenge",
    organizingCollege: "BITS Pilani",
    category: "Healthcare",
    prizePool: "₹3,50,000",
    registrationDeadline: "April 5, 2024",
    eligibility: "Medical, engineering, and management students. Must have valid college ID from recognized institutions",
    participants: 5400,
    colleges: ["AIIMS", "CMC", "IIT-D", "IIM-A"],
    isHot: false
  },
  {
    id: "6",
    title: "Smart City Planning Competition",
    organizingCollege: "NIT Trichy",
    category: "Urban Planning",
    prizePool: "₹2,00,000", 
    registrationDeadline: "April 10, 2024",
    eligibility: "Architecture, civil engineering, and urban planning students from NITs, IITs, and other technical institutes",
    participants: 7800,
    colleges: ["IIT-R", "SPA", "NIT-S", "BIT"],
    isHot: false
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
                <div className="live-indicator text-accent font-semibold">
                  LIVE UPDATES
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Trending <span className="text-glow">Competitions</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                  Top 20 trending case competitions across DU, IIMs, IITs, BITS, NITs, 
                  and premier institutions nationwide. Updated in real-time.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button className="cta-primary text-lg px-8 py-6">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Explore Competitions
                </Button>
                <Button variant="outline" className="text-lg px-8 py-6 glass-effect">
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
                    <div key={comp.id} className="flex items-center justify-between p-3 rounded-lg bg-card/50 border border-border/10">
                      <div className="flex items-center gap-3">
                        <div className="text-accent font-bold text-lg">#{index + 1}</div>
                        <div>
                          <div className="font-medium text-sm">{comp.title.split(' ').slice(0, 3).join(' ')}</div>
                          <div className="text-xs text-muted-foreground">{comp.organizingCollege}</div>
                        </div>
                      </div>
                      <div className="text-accent font-semibold text-sm">
                        {(comp.participants / 1000).toFixed(1)}K
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 border-b border-border/20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe className="w-4 h-4 text-accent" />
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-accent" />
                <span>{competitions.length} Active Competitions</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-accent" />
                <span>{competitions.reduce((sum, comp) => sum + comp.participants, 0).toLocaleString()} Participants</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">Live Competition Feed</h2>
                <p className="text-muted-foreground">
                  Real-time updates from top institutions across India
                </p>
              </div>
              <Badge className="live-indicator cta-accent">
                LIVE
              </Badge>
            </div>

            <FilterBar
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
