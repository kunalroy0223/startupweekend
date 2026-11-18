/** Abstract, not-to-scale venue illustration (topographic lines + pin). */
export function VenueMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 300" className={className} aria-hidden="true">
      <rect width="400" height="300" fill="#141614" />
      {Array.from({ length: 9 }, (_, i) => (
        <path
          key={i}
          d={`M-20 ${40 + i * 28} C 80 ${10 + i * 30}, 160 ${90 + i * 22}, 240 ${50 + i * 28} S 380 ${80 + i * 26}, 430 ${40 + i * 30}`}
          fill="none"
          stroke={i === 4 ? "#39c463" : "#8298ab"}
          strokeOpacity={i === 4 ? 0.9 : 0.25}
          strokeWidth={i === 4 ? 3 : 1}
        />
      ))}
      <path d="M60 300 L180 0" stroke="#f0efe9" strokeOpacity=".2" strokeWidth="10" />
      <path d="M0 210 L400 170" stroke="#f0efe9" strokeOpacity=".15" strokeWidth="6" />
      <g transform="translate(232 128)">
        <ellipse cx="0" cy="44" rx="26" ry="7" fill="#000" opacity=".6" />
        <path d="M0 44 C -6 26, -26 14, -26 -6 A 26 26 0 1 1 26 -6 C 26 14, 6 26, 0 44 Z" fill="#39c463" stroke="#000" strokeWidth="3" />
        <circle cx="0" cy="-6" r="9" fill="#000" />
      </g>
      <text x="16" y="284" fill="#f0efe9" fillOpacity=".5" fontFamily="monospace" fontSize="10" letterSpacing="2">
        ILLUSTRATION · NOT TO SCALE
      </text>
    </svg>
  );
}
