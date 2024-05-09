import React from 'react';

const cleanPercentage = (score) => {
  // Calculate the percentage based on the score range (300 to 850)
  const percentage = ((score - 300) / (850 - 300)) * 100;
  
  // Ensure the percentage is within the valid range (0 to 100)
  return Math.min(Math.max(percentage, 0), 850);
};

const Circle = ({ colour, percentage }) => {
  const r = 70;
  const circ = 2 * Math.PI * r;
  const strokeOffset = (percentage * circ) / 100;
  const animationDuration = 2;
  return (
    <circle
      r={r}
      cx={100}
      cy={100}
      fill="transparent"
      stroke={colour}
      strokeWidth={"2rem"}
      strokeDasharray={circ}
      strokeDashoffset={strokeOffset}
      
    ></circle>
  );
};

const Text = ({ percentage }) => {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      fontSize={"1.5em"}
    >
      {percentage.toFixed(0)}%
    </text>
  );
};

const Pie = ({ score, colour }) => {
  const pct = cleanPercentage(score);
  return (
    <svg style={{top:"45%", left:"45%" , transitionDuration:"5s"}} width={200} height={200}>
      <g transform={`rotate(-90 ${"100 100"})`}>
        <Circle colour="lightgrey" percentage={100} />
        <Circle colour={colour} percentage={pct} />
      </g>
      <Text percentage={pct} />
    </svg>
  );
};

export default Pie;
