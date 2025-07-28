import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CompetitionCard } from "@/components/CompetitionCard";
import { FilterBar } from "@/components/FilterBar";
import { TrendingUp, Zap, Trophy, Users, Globe } from "lucide-react";
import heroImage from "@/assets/hero-competitions.jpg";

// Mock data for competitions
const mockCompetitions = [
  {
    id: "1",
    title: "Global Business Case Challenge 2024",
    organizer: "McKinsey & Company",
    category: "Strategy",
    prize: "₹5,00,000",
    deadline: "March 15, 2024",
    participants: 12500,
    colleges: ["IIM-A", "IIM-B", "IIT-D", "BITS"],
    isHot: true,
    description: "Solve real-world business challenges faced by Fortune 500 companies. Test your strategic thinking and analytical skills."
  },
  {
    id: "2", 
    title: "Fintech Innovation Summit",
    organizer: "Goldman Sachs",
    category: "Finance",
    prize: "₹3,00,000",
    deadline: "March 20, 2024",
    participants: 8900,
    colleges: ["IIM-C", "XLRI", "ISB", "DU"],
    isHot: true,
    description: "Design the next breakthrough fintech solution. Focus on digital payments, blockchain, and financial inclusion."
  },
  {
    id: "3",
    title: "Sustainable Energy Challenge",
    organizer: "Shell",
    category: "Energy",
    prize: "₹4,00,000",
    deadline: "March 25, 2024", 
    participants: 6700,
    colleges: ["IIT-B", "IIT-M", "NIT-T", "BITS"],
    isHot: false,
    description: "Develop innovative solutions for renewable energy adoption and carbon footprint reduction in emerging markets."
  },
  {
    id: "4",
    title: "Digital Transformation Case Study",
    organizer: "Accenture",
    category: "Technology",
    prize: "₹2,50,000",
    deadline: "March 30, 2024",
    participants: 15200,
    colleges: ["IIT-KGP", "IIM-L", "BITS", "NIT-K"],
    isHot: true,
    description: "Help traditional businesses embrace digital technologies. Focus on AI, IoT, and cloud transformation strategies."
  },
  {
    id: "5",
    title: "Healthcare Innovation Lab",
    organizer: "Pfizer",
    category: "Healthcare",
    prize: "₹3,50,000",
    deadline: "April 5, 2024",
    participants: 5400,
    colleges: ["AIIMS", "CMC", "IIT-D", "IIM-A"],
    isHot: false,
    description: "Address critical healthcare challenges in rural India. Develop scalable solutions for better healthcare access."
  },
  {
    id: "6",
    title: "Smart City Planning Challenge",
    organizer: "Deloitte",
    category: "Urban Planning",
    prize: "₹2,00,000", 
    deadline: "April 10, 2024",
    participants: 7800,
    colleges: ["IIT-R", "SPA", "NIT-S", "BIT"],
    isHot: false,
    description: "Design sustainable urban solutions for India's growing cities. Focus on transportation, housing, and infrastructure."
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
                         comp.organizer.toLowerCase().includes(searchQuery.toLowerCase());
    
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

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">50K+</div>
                  <div className="text-sm text-muted-foreground">Active Participants</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">120+</div>
                  <div className="text-sm text-muted-foreground">Colleges</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">₹50L+</div>
                  <div className="text-sm text-muted-foreground">Total Prizes</div>
                </div>
              </div>
            </div>

            <div className="relative lg:block hidden">
              <img 
                src={heroImage} 
                alt="Trending Competitions"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent rounded-2xl"></div>
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
