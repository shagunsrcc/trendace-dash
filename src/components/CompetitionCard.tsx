import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Users, ExternalLink } from "lucide-react";

interface Competition {
  id: string;
  title: string;
  organizer: string;
  category: string;
  prize: string;
  deadline: string;
  participants: number;
  colleges: string[];
  isHot: boolean;
  description: string;
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
            <CardTitle className="text-xl font-bold text-foreground mb-2">
              {competition.title}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {competition.organizer}
            </CardDescription>
          </div>
          {competition.isHot && (
            <Badge className="cta-accent text-xs font-semibold">
              🔥 HOT
            </Badge>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {competition.colleges.slice(0, 3).map((college) => (
            <Badge key={college} variant="secondary" className="college-tag text-xs">
              {college}
            </Badge>
          ))}
          {competition.colleges.length > 3 && (
            <Badge variant="secondary" className="college-tag text-xs">
              +{competition.colleges.length - 3} more
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {competition.description}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-accent" />
            <span className="text-foreground font-medium">{competition.prize}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-accent" />
            <span className="text-foreground">{competition.participants.toLocaleString()} participants</span>
          </div>
          <div className="flex items-center gap-2 col-span-2">
            <Calendar className="w-4 h-4 text-accent" />
            <span className="text-foreground">Deadline: {competition.deadline}</span>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button className="cta-primary flex-1" size="sm">
            View Details
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Apply
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};