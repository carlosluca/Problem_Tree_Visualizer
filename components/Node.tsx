import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import { Vector3, Group, Mesh } from 'three';
import { NodeData, NodeType } from '../types';
import { useStore } from '../store';
import { COLORS, GLOW_COLORS } from '../constants';

interface NodeProps {
  data: NodeData;
}

export const Node: React.FC<NodeProps> = ({ data }) => {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);
  const { hoveredNode, setHoveredNode, selectedNode, setSelectedNode } = useStore();
  
  const isHovered = hoveredNode === data.id;
  const isSelected = selectedNode === data.id;
  const isRoot = data.type === NodeType.ROOT;
  const isTrunk = data.type === NodeType.TRUNK;

  const baseColor = COLORS[data.type];
  const glowColor = GLOW_COLORS[data.type];

  // Reusable vector to avoid garbage collection in the loop
  const targetScaleVec = useMemo(() => new Vector3(), []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotation logic
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.z += delta * 0.05;

      // Scale pulse
      const scaleTarget = isHovered || isSelected ? 1.3 : 1;
      targetScaleVec.set(scaleTarget, scaleTarget, scaleTarget);
      meshRef.current.scale.lerp(targetScaleVec, delta * 5);
    }
  });

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHoveredNode(data.id);
    document.body.style.cursor = 'pointer';
  };

  const handlePointerOut = () => {
    setHoveredNode(null);
    document.body.style.cursor = 'auto';
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    setSelectedNode(isSelected ? null : data.id);
  };

  return (
    <group 
      ref={groupRef} 
      position={data.position}
    >
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh
                ref={meshRef}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                onClick={handleClick}
            >
                {/* Geometries */}
                {isTrunk && <icosahedronGeometry args={[1.2, 0]} />}
                {isRoot && <octahedronGeometry args={[0.8, 0]} />}
                {!isTrunk && !isRoot && <dodecahedronGeometry args={[0.6, 0]} />}
                
                {/* High quality physical material for glass effect */}
                <meshPhysicalMaterial
                    transparent
                    transmission={0.9}
                    opacity={1}
                    roughness={0.1}
                    metalness={0.1}
                    ior={1.5}
                    thickness={0.5}
                    color={baseColor}
                    emissive={isHovered || isSelected ? glowColor : baseColor}
                    emissiveIntensity={isHovered || isSelected ? 0.8 : 0.2}
                    clearcoat={1}
                    attenuationColor="#ffffff"
                    attenuationDistance={0.5}
                />
            </mesh>
            
            {/* Outer Glow Ring for Selected */}
            {isSelected && (
                <mesh scale={[1.5, 1.5, 1.5]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshBasicMaterial 
                        color={glowColor} 
                        transparent 
                        opacity={0.1} 
                        wireframe 
                    />
                </mesh>
            )}

            {/* In-Scene Label */}
            <group position={[0, isTrunk ? 1.8 : 1.2, 0]}>
                <Text
                    fontSize={isTrunk ? 0.5 : 0.3}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#000000"
                >
                    {data.label}
                </Text>
                {data.subLabel && (
                     <Text
                        position={[0, -0.25, 0]}
                        fontSize={0.15}
                        color={glowColor}
                        anchorX="center"
                        anchorY="middle"
                    >
                        {data.subLabel.toUpperCase()}
                    </Text>
                )}
            </group>
        </Float>
    </group>
  );
};