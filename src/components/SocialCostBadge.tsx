import { Zap, HandshakeIcon, AlertTriangle } from 'lucide-react';

export type SocialCostLevel = 'stealth' | 'polite' | 'trap';

interface SocialCostBadgeProps {
  level: SocialCostLevel;
  className?: string;
}

const socialCostConfig = {
  stealth: {
    label: 'Grab & Sprint',
    time: '0-30s',
    color: 'bg-green-100 text-green-800',
    icon: Zap,
    tooltip: 'Pure efficiency. Zero eye contact required. Risk of being recruited: None.',
  },
  polite: {
    label: 'Nod & Smile',
    time: '~2 mins',
    color: 'bg-yellow-100 text-yellow-800',
    icon: HandshakeIcon,
    tooltip: 'Brief small talk expected. Practice your "I have class soon" excuse. Risk of being recruited: Medium.',
  },
  trap: {
    label: 'Listen to Pitch',
    time: '15+ mins',
    color: 'bg-red-100 text-red-800',
    icon: AlertTriangle,
    tooltip: 'Prepare for a full product demo. Bring business cards. Risk of being recruited for a startup: High.',
  },
};

export default function SocialCostBadge({ level, className = '' }: SocialCostBadgeProps) {
  const config = socialCostConfig[level];
  const Icon = config.icon;

  return (
    <div className={`group relative ${className}`}>
      <div className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium ${config.color}`}>
        <Icon className="h-3.5 w-3.5" />
        <span>{config.label}</span>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
        <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
          <div className="font-semibold mb-1">Social Battery Cost: {config.time}</div>
          <div className="text-gray-300">{config.tooltip}</div>
          {/* Tooltip arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
            <div className="border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
