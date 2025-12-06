import { Trophy, Medal, Award } from 'lucide-react';

export interface LeaderboardUser {
  rank: number;
  username: string;
  title: string;
  stat: string;
  statLabel: string;
}

interface LeaderboardWidgetProps {
  users: LeaderboardUser[];
  className?: string;
}

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />;
    case 3:
      return <Award className="h-5 w-5 text-orange-600" />;
    default:
      return <span className="text-sm font-bold text-gray-400">#{rank}</span>;
  }
};

export default function LeaderboardWidget({ users, className = '' }: LeaderboardWidgetProps) {
  return (
    <div className={`card ${className}`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">Starving Student Leaderboard</h3>
            <p className="text-xs text-gray-500 mt-0.5">Hall of Fame: Professional Freeloaders</p>
          </div>
          <p className="text-xs text-gray-500 italic">
            Your rank: #247
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {users.map((user) => (
            <div
              key={user.rank}
              className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              {/* Rank Icon */}
              <div className="flex-shrink-0">
                {getRankIcon(user.rank)}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-sm font-semibold text-gray-900 truncate">
                    {user.username}
                  </span>
                </div>
                <p className="text-xs text-gray-600 italic truncate">
                  "{user.title}"
                </p>
              </div>

              {/* Stat */}
              <div className="flex-shrink-0 text-right">
                <div className="text-sm font-bold text-primary-600">
                  {user.stat}
                </div>
                <div className="text-xs text-gray-500">
                  {user.statLabel}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
