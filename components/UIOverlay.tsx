import React from 'react';
import { useStore } from '../store';
import { DATA, COLORS, GLOW_COLORS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BrainCircuit, GitBranch, Leaf, AlertTriangle, Lightbulb } from 'lucide-react';
import { NodeType } from '../types';

export const UIOverlay: React.FC = () => {
  const { selectedNode, setSelectedNode } = useStore();
  
  const activeNode = DATA.find(n => n.id === selectedNode);

  const getIcon = (type: NodeType) => {
    switch (type) {
        case NodeType.ROOT: return <BrainCircuit className="w-6 h-6" />;
        case NodeType.TRUNK: return <AlertTriangle className="w-8 h-8" />;
        case NodeType.BRANCH: return <GitBranch className="w-6 h-6" />;
        case NodeType.LEAF_GAP: return <X className="w-6 h-6" />;
        case NodeType.LEAF_OPP: return <Lightbulb className="w-6 h-6" />;
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6">
      
      {/* Header */}
      <header className="pointer-events-auto flex justify-between items-start">
        <div className="bg-black/40 backdrop-blur-md p-4 border-l-2 border-purple-500">
            <h1 className="text-3xl font-bold title-font tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">
                NEURO-ARCHITECTURAL VISUALIZER
            </h1>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-[0.2em]">Roots of AI Amnesia Analysis</p>
        </div>
        <div className="text-right text-xs text-gray-500 font-mono hidden md:block">
            <p>V.1.0.4</p>
            <p>RENDER: THREE.JS/R3F</p>
            <p>STATUS: ONLINE</p>
        </div>
      </header>

      {/* Details Panel */}
      <AnimatePresence>
        {activeNode && (
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-0 right-0 h-full w-full md:w-[450px] bg-black/80 backdrop-blur-xl border-l border-white/10 pointer-events-auto shadow-2xl overflow-y-auto"
          >
            <div className="p-8 h-full flex flex-col relative">
                <button 
                    onClick={() => setSelectedNode(null)}
                    className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors"
                >
                    <X className="w-6 h-6 text-gray-400" />
                </button>

                <div className="mt-12 mb-6">
                    <span 
                        className="text-xs font-bold px-2 py-1 rounded border tracking-widest uppercase"
                        style={{ 
                            color: COLORS[activeNode.type], 
                            borderColor: COLORS[activeNode.type],
                            backgroundColor: `${COLORS[activeNode.type]}20`
                        }}
                    >
                        {activeNode.type.replace('_', ' ')}
                    </span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                     <div 
                        className="p-3 rounded-xl shadow-lg"
                        style={{ backgroundColor: `${GLOW_COLORS[activeNode.type]}20`, color: GLOW_COLORS[activeNode.type] }}
                     >
                        {getIcon(activeNode.type)}
                     </div>
                     <h2 className="text-4xl title-font font-bold leading-none text-white">
                        {activeNode.label}
                     </h2>
                </div>
                
                <h3 className="text-xl text-gray-400 font-light mb-8 font-mono border-b border-white/10 pb-4">
                    {activeNode.subLabel}
                </h3>

                <p className="text-lg leading-relaxed text-gray-200">
                    {activeNode.description}
                </p>

                <div className="mt-auto pt-10 text-xs text-gray-600 font-mono">
                    <p>NODE ID: {activeNode.id}</p>
                    <p>COORDS: [{activeNode.position.map(n => n.toFixed(1)).join(', ')}]</p>
                    {activeNode.connections.length > 0 && (
                        <p className="mt-2">LINKS_TO: {activeNode.connections.join(' -> ')}</p>
                    )}
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions / Footer */}
      {!selectedNode && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="text-center md:text-left pointer-events-none"
          >
              <div className="inline-block bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5">
                  <p className="text-sm text-gray-400">
                      <span className="text-purple-400 font-bold">DRAG</span> to rotate 
                      <span className="mx-2">•</span> 
                      <span className="text-blue-400 font-bold">SCROLL</span> to zoom
                      <span className="mx-2">•</span> 
                      <span className="text-green-400 font-bold">CLICK</span> nodes to analyze
                  </p>
              </div>
          </motion.div>
      )}
    </div>
  );
};