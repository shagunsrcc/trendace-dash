import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy, Users, ExternalLink } from "lucide-react";

interface Competition {
  id: string;
  title: string;
  organizingCollege: string;
  category: string;
  prizePool: string;
  registrationDeadline: string;
  eligibility: string;
  participants: number;
  colleges: string[];
  isHot: boolean;
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
          {competition.isHot && (
            <Badge className="cta-accent text-xs font-semibold">
              🔥 HOT
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Organizing College */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-accent uppercase tracking-wide">
            Organizing College
          </h4>
          <p className="text-lg font-medium text-foreground">
            {competition.organizingCollege}
          </p>
        </div>

        {/* Registration Deadline */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-accent uppercase tracking-wide flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Registration Deadline
          </h4>
          <p className="text-lg font-medium text-foreground">
            {competition.registrationDeadline}
          </p>
        </div>

        {/* Prize Pool */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-accent uppercase tracking-wide flex items-center gap-2">
            <Trophy className="w-4 h-4" />
            Prize Pool
          </h4>
          <p className="text-lg font-medium text-foreground">
            {competition.prizePool}
          </p>
        </div>

        {/* Eligibility */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-accent uppercase tracking-wide flex items-center gap-2">
            <Users className="w-4 h-4" />
            Eligibility
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {competition.eligibility}
          </p>
        </div>

        {/* Participant Count */}
        <div className="pt-2 border-t border-border/30">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Current Participants</span>
            <span className="text-accent font-semibold">{competition.participants.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button className="cta-primary flex-1" size="sm">
            Register Now
          </Button>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ExternalLink className="w-4 h-4" />
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};