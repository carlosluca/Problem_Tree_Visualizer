import React, { useRef, useMemo } from 'react';
import { CubicBezierLine } from '@react-three/drei';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';

interface ConnectionLineProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
}

export const ConnectionLine: React.FC<ConnectionLineProps> = ({ start, end, color }) => {
  const lineRef = useRef<any>(null);
  const startVec = useMemo(() => new Vector3(...start), [start]);
  const endVec = useMemo(() => new Vector3(...end), [end]);

  // Calculate control points for a nice curve
  const midY = (start[1] + end[1]) / 2;
  const controlA = useMemo(() => new Vector3(start[0], midY, start[2]), [start, midY]);
  const controlB = useMemo(() => new Vector3(end[0], midY, end[2]), [end, midY]);

  useFrame((state) => {
    if (lineRef.current) {
        // Subtle animation of line width or pulsing could go here
        lineRef.current.material.dashOffset -= 0.01;
    }
  });

  return (
    <CubicBezierLine
      ref={lineRef}
      start={startVec}
      end={endVec}
      midA={controlA}
      midB={controlB}
      color={color}
      lineWidth={1.5}
      dashed={false}
      opacity={0.4}
      transparent
    />
  );
};