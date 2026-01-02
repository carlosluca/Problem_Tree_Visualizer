import React, { useEffect, useRef, useMemo } from 'react';
import { CameraControls, Stars, Sparkles, Environment, PerspectiveCamera } from '@react-three/drei';
import { Node } from './Node';
import { ConnectionLine } from './ConnectionLine';
import { DATA, COLORS } from '../constants';
import { useStore } from '../store';

export const Scene: React.FC = () => {
  const controlsRef = useRef<CameraControls>(null);
  const { selectedNode } = useStore();
  
  // Handle camera movement based on selection
  useEffect(() => {
    if (!controlsRef.current) return;

    if (selectedNode) {
      const node = DATA.find((n) => n.id === selectedNode);
      if (node) {
        const [x, y, z] = node.position;
        controlsRef.current.setLookAt(
            x, y, z + 6, // Camera Position
            x, y, z,     // Target
            true         // Transition
        );
      }
    } else {
      controlsRef.current.setLookAt(
          0, 2, 14, // Overview Position
          0, 1, 0,  // Target
          true
      );
    }
  }, [selectedNode]);

  // Generate connections
  const connections = useMemo(() => {
    const lines: React.ReactNode[] = [];
    DATA.forEach((node) => {
      node.connections.forEach((targetId) => {
        const target = DATA.find((n) => n.id === targetId);
        if (target) {
          lines.push(
            <ConnectionLine
              key={`${node.id}-${target.id}`}
              start={node.position}
              end={target.position}
              color={COLORS[node.type]}
            />
          );
        }
      });
    });
    return lines;
  }, []);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 2, 14]} fov={50} />
      <CameraControls 
        ref={controlsRef} 
        minDistance={5} 
        maxDistance={30} 
        smoothTime={0.8}
        truckSpeed={0}
        dollySpeed={0.5}
      />
      
      {/* Enhanced Lighting for Physical Material */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#ffffff" />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color="#6666ff" />
      <spotLight 
        position={[0, 10, 0]} 
        angle={0.5} 
        penumbra={1} 
        intensity={3} 
        castShadow 
        color="#a855f7" 
      />
      <rectAreaLight width={10} height={10} position={[0, 0, 10]} intensity={1} color="#ffffff" />

      {/* Environment */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={200} scale={12} size={2} speed={0.4} opacity={0.5} color="#ffffff" />
      <Environment preset="city" blur={0.5} />

      {/* Graph Content */}
      <group>
        {DATA.map((node) => (
          <Node key={node.id} data={node} />
        ))}
        {connections}
      </group>
    </>
  );
};