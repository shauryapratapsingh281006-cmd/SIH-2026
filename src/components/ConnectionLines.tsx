import React from 'react';
import { motion } from 'framer-motion';

export interface ConnectionLinesProps {
  activeNode: string | null;
}

const NODES = [
  { id: 'people', cx: 200, color: '#60A5FA' },
  { id: 'ngos', cx: 600, color: '#2DD4BF' },
  { id: 'gov', cx: 1000, color: '#A78BFA' },
];

// Each connector flows down from card-center cx to one of three merge points on the core top edge
const MERGE_POINTS = [380, 600, 820];

export const ConnectionLines: React.FC<ConnectionLinesProps> = ({ activeNode }) => {
  return (
    <div
      className="w-full relative select-none pointer-events-none"
      aria-hidden="true"
      style={{ height: 52 }}
    >
      {/* Desktop SVG converging lines */}
      <div className="hidden md:block w-full h-full">
        <svg
          viewBox="0 0 1200 52"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            {NODES.map(n => (
              <filter key={n.id} id={`glow-${n.id}`} x="-80%" y="-80%" width="260%" height="260%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
          </defs>

          {/* Horizontal top rail — subtle base line connecting card centers */}
          <line
            x1="200" y1="2" x2="1000" y2="2"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />

          {/* Connector paths: card center → merge point on core */}
          {NODES.map((n, i) => {
            const mx = MERGE_POINTS[i];
            const isActive = activeNode === n.id;
            const path = `M ${n.cx} 2 C ${n.cx} 28, ${mx} 28, ${mx} 52`;
            return (
              <g key={n.id}>
                {/* Base path */}
                <path
                  d={path}
                  stroke={n.color}
                  strokeWidth={isActive ? '1.5' : '1'}
                  strokeOpacity={isActive ? 0.9 : 0.3}
                  style={{ transition: 'stroke-opacity 0.3s ease, stroke-width 0.3s ease' }}
                />

                {/* Origin pip at card bottom-center */}
                <circle
                  cx={n.cx}
                  cy="2"
                  r="2.5"
                  fill={n.color}
                  opacity={isActive ? 1 : 0.45}
                  filter={`url(#glow-${n.id})`}
                  style={{ transition: 'opacity 0.3s ease' }}
                />

                {/* Terminal pip at core top */}
                <circle
                  cx={mx}
                  cy="51"
                  r="2.5"
                  fill={n.color}
                  opacity={isActive ? 1 : 0.5}
                  filter={`url(#glow-${n.id})`}
                  style={{ transition: 'opacity 0.3s ease' }}
                />

                {/* Animated flow particle */}
                <circle r="2.2" fill={n.color} filter={`url(#glow-${n.id})`} opacity="0.85">
                  <animateMotion
                    path={path}
                    dur={`${4.2 + i * 0.5}s`}
                    begin={`${i * 1.3}s`}
                    repeatCount="indefinite"
                    calcMode="spline"
                    keyTimes="0;1"
                    keySplines="0.4 0 0.6 1"
                  />
                </circle>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mobile: simple vertical connector */}
      <div className="md:hidden flex justify-center items-center h-full">
        <div
          className="w-px h-full"
          style={{
            background: 'linear-gradient(to bottom, rgba(96,165,250,0.3), rgba(45,212,191,0.3), rgba(167,139,250,0.3))',
          }}
        />
      </div>
    </div>
  );
};

export default ConnectionLines;
