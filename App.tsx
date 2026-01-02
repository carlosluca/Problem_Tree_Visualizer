import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './components/Scene';
import { UIOverlay } from './components/UIOverlay';
import { Loader } from '@react-three/drei';

const App: React.FC = () => {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      
      {/* 3D Scene */}
      <Canvas
        dpr={[1, 2]} // Support high DPI
        gl={{ 
            antialias: true, // Re-enabled antialiasing for crisp lines
            stencil: false,
            depth: true
        }}
        camera={{ position: [0, 0, 15], fov: 45 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
      
      {/* Loading overlay built-in from Drei */}
      <Loader 
        containerStyles={{ background: '#050505' }}
        innerStyles={{ width: '400px', height: '10px', background: '#333' }}
        barStyles={{ background: '#a855f7', height: '10px' }}
        dataStyles={{ fontFamily: 'Rajdhani', fontSize: '1.2em' }}
        dataInterpolation={(p) => `LOADING NEURAL LINK ${p.toFixed(0)}%`}
      />

      {/* HTML Interface */}
      <UIOverlay />
      
    </div>
  );
};

export default App;