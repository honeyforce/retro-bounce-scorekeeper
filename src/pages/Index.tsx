import { useState } from 'react';
import { TeamPanel } from '../components/TeamPanel';
import { Timer } from '../components/Timer';
import { TeamMember } from '../types/team';

const Index = () => {
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [homeMembers, setHomeMembers] = useState<TeamMember[]>([]);
  const [awayMembers, setAwayMembers] = useState<TeamMember[]>([]);
  const [homeFouls, setHomeFouls] = useState(0);
  const [awayFouls, setAwayFouls] = useState(0);
  const [homeName, setHomeName] = useState('HOME');
  const [awayName, setAwayName] = useState('AWAY');

  const handleMemberFoul = (team: 'home' | 'away', memberId: string) => {
    const updateMembers = (members: TeamMember[]) => {
      return members.map(member => {
        if (member.id === memberId && member.personalFouls < 5) {
          return { ...member, personalFouls: member.personalFouls + 1 };
        }
        return member;
      });
    };

    if (team === 'home') {
      setHomeMembers(updateMembers(homeMembers));
      setHomeFouls(homeFouls + 1);
    } else {
      setAwayMembers(updateMembers(awayMembers));
      setAwayFouls(awayFouls + 1);
    }
  };

  const handleTeamFoulChange = (team: 'home' | 'away', change: number) => {
    if (team === 'home') {
      setHomeFouls(Math.max(0, homeFouls + change));
    } else {
      setAwayFouls(Math.max(0, awayFouls + change));
    }
  };

  const handleMemberScore = (team: 'home' | 'away', memberId: string, points: number) => {
    const updateMembers = (members: TeamMember[]) => {
      return members.map(member => {
        if (member.id === memberId) {
          return { ...member, score: member.score + points };
        }
        return member;
      });
    };

    if (team === 'home') {
      setHomeMembers(updateMembers(homeMembers));
      setHomeScore(homeScore + points);
    } else {
      setAwayMembers(updateMembers(awayMembers));
      setAwayScore(awayScore + points);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TeamPanel
            name={homeName}
            score={homeScore}
            onScoreChange={(points) => setHomeScore(homeScore + points)}
            members={homeMembers}
            totalFouls={homeFouls}
            onAddMember={(member) => setHomeMembers([...homeMembers, member])}
            onMemberFoul={(memberId) => handleMemberFoul('home', memberId)}
            onMemberScore={(memberId, points) => handleMemberScore('home', memberId, points)}
            onTeamFoulChange={(change) => handleTeamFoulChange('home', change)}
            onNameChange={setHomeName}
          />
          <div className="flex items-center justify-center">
            <Timer />
          </div>
          <TeamPanel
            name={awayName}
            score={awayScore}
            onScoreChange={(points) => setAwayScore(awayScore + points)}
            members={awayMembers}
            totalFouls={awayFouls}
            onAddMember={(member) => setAwayMembers([...awayMembers, member])}
            onMemberFoul={(memberId) => handleMemberFoul('away', memberId)}
            onMemberScore={(memberId, points) => handleMemberScore('away', memberId, points)}
            onTeamFoulChange={(change) => handleTeamFoulChange('away', change)}
            onNameChange={setAwayName}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;