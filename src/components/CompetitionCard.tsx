import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Users, ExternalLink } from "lucide-react";

interface Competition {
  id: string;
  title: string;
  competitionType: string;
  organizingCollege: string;
  category: string;
  eligibility: string;
  participants: number;
  colleges: string[];
  isHot: boolean;
  applyUrl: string;
}

interface CompetitionCardProps {
  competition: Competition;
}

export const CompetitionCard = ({ competition }: CompetitionCardProps) => {
  return (
    <Card className="competition-card">
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-bold text-foreground mb-3">
              {competition.title}
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Competition Type */}
        <div>
          <p className="text-sm text-muted-foreground italic">
            {competition.competitionType}
          </p>
        </div>

        {/* Organizing College */}
        <div>
          <h4 className="text-xs font-semibold text-accent uppercase tracking-wide mb-1">
            🏫 Organizer
          </h4>
          <p className="text-sm font-medium text-foreground">
            {competition.organizingCollege}
          </p>
        </div>

        {/* Eligibility */}
        <div>
          <h4 className="text-xs font-semibold text-accent uppercase tracking-wide mb-1">
            🎓 Eligibility
          </h4>
          <p className="text-sm text-muted-foreground">
            {competition.eligibility}
          </p>
        </div>


        {/* Apply Now Button */}
        <div className="pt-2">
          <Button 
            className="cta-primary w-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/20" 
            size="sm"
            onClick={() => window.open(competition.applyUrl, '_blank')}
          >
            🔗 Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};