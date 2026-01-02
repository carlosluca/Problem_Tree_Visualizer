import { NodeData, NodeType } from './types';

// Palette mapping for 3D elements
export const COLORS = {
  [NodeType.ROOT]: '#a855f7', // Purple
  [NodeType.TRUNK]: '#38bdf8', // Light Blue/Cyan
  [NodeType.BRANCH]: '#10b981', // Emerald
  [NodeType.LEAF_GAP]: '#ef4444', // Red
  [NodeType.LEAF_OPP]: '#eab308', // Gold
};

export const GLOW_COLORS = {
  [NodeType.ROOT]: '#d8b4fe',
  [NodeType.TRUNK]: '#bae6fd',
  [NodeType.BRANCH]: '#6ee7b7',
  [NodeType.LEAF_GAP]: '#fca5a5',
  [NodeType.LEAF_OPP]: '#fde047',
};

export const DATA: NodeData[] = [
  // --- ROOTS ---
  {
    id: 'R1',
    type: NodeType.ROOT,
    label: 'No Hebbian Plasticity',
    subLabel: 'Frozen Weights',
    description: 'Weights are frozen post-training; the model cannot learn from its interactions in real-time like a biological brain.',
    position: [-4, -3, 2],
    connections: ['T1']
  },
  {
    id: 'R2',
    type: NodeType.ROOT,
    label: 'Finite Resources',
    subLabel: 'O(N²) Complexity',
    description: 'Self-Attention complexity scales quadratically, strictly limiting the amount of historical context the model can process.',
    position: [-2, -3.5, -2],
    connections: ['T1']
  },
  {
    id: 'R3',
    type: NodeType.ROOT,
    label: 'Markovian Bias',
    subLabel: 'Local Optimization',
    description: 'Optimization prioritizes local statistical dependencies (predicting the next token) rather than long-term planning.',
    position: [0, -4, 3],
    connections: ['T1']
  },
  {
    id: 'R4',
    type: NodeType.ROOT,
    label: 'Monolithic Rep',
    subLabel: 'Entangled Knowledge',
    description: 'Inability to cleanly disentangle Epistemic knowledge (facts) from Procedural knowledge (reasoning/logic).',
    position: [2, -3.5, -2],
    connections: ['T1']
  },
  {
    id: 'R5',
    type: NodeType.ROOT,
    label: 'Loss of Semantics',
    subLabel: 'Vector Compression',
    description: 'Vector compression and cosine similarity strip away critical causal and temporal relationships in data.',
    position: [4, -3, 2],
    connections: ['T1']
  },

  // --- TRUNK ---
  {
    id: 'T1',
    type: NodeType.TRUNK,
    label: 'THE CORE PROBLEM',
    subLabel: 'Systemic Amnesia',
    description: 'The inability to maintain a coherent, persistent state across disjoint interaction episodes. The system resets every time.',
    position: [0, 0, 0],
    connections: ['B1', 'B2', 'B3', 'B4', 'B5']
  },

  // --- BRANCHES ---
  {
    id: 'B1',
    type: NodeType.BRANCH,
    label: 'Hallucination',
    subLabel: 'Confabulation',
    description: 'Failure of source monitoring due to probabilistic filling of voids. The model invents plausible-sounding untruths.',
    position: [-3, 3, 2],
    connections: ['L_OPP_1', 'L_GAP_1']
  },
  {
    id: 'B2',
    type: NodeType.BRANCH,
    label: '"Goldfish" Effect',
    subLabel: 'Context Loss',
    description: 'Catastrophic forgetting leading to an inability to maintain global coherence over long conversations.',
    position: [-1.5, 4, -2],
    connections: ['L_OPP_1', 'L_GAP_2']
  },
  {
    id: 'B3',
    type: NodeType.BRANCH,
    label: 'No Personalization',
    subLabel: 'No Theory of Mind',
    description: 'Absence of specific user modeling due to invariant weights across millions of user instances.',
    position: [0, 5, 2],
    connections: ['L_OPP_2', 'L_GAP_3']
  },
  {
    id: 'B4',
    type: NodeType.BRANCH,
    label: 'Reasoning Decay',
    subLabel: 'Lost in Middle',
    description: 'Dilution of attention scores causes the model to lose track of key details in the middle of long contexts.',
    position: [1.5, 4, -2],
    connections: ['L_OPP_3']
  },
  {
    id: 'B5',
    type: NodeType.BRANCH,
    label: 'Inefficient Scaling',
    subLabel: 'Redundant Compute',
    description: 'Redundant re-computation of identical attention matrices creates prohibitive cost and latency.',
    position: [3, 3, 2],
    connections: ['L_OPP_2']
  },

  // --- LEAVES (GAPS) ---
  {
    id: 'L_GAP_1',
    type: NodeType.LEAF_GAP,
    label: 'RAG Brittleness',
    subLabel: 'Search Failure',
    description: 'Semantic search often fails on nuanced context, retrieving irrelevant or missing crucial information.',
    position: [-5, 6, 3],
    connections: []
  },
  {
    id: 'L_GAP_2',
    type: NodeType.LEAF_GAP,
    label: 'Context Limits',
    subLabel: 'Hard Boundaries',
    description: 'Even with larger windows, accuracy degrades and costs skyrocket linearly or quadratically.',
    position: [-3, 7, -3],
    connections: []
  },
  {
    id: 'L_GAP_3',
    type: NodeType.LEAF_GAP,
    label: 'Vector Limits',
    subLabel: 'Static Snapshots',
    description: 'Vector DBs provide static snapshots of data, failing to capture evolving understanding or relationships.',
    position: [0, 7.5, 4],
    connections: []
  },

  // --- LEAVES (OPPORTUNITIES) ---
  {
    id: 'L_OPP_1',
    type: NodeType.LEAF_OPP,
    label: 'Episodic Memory',
    subLabel: 'Time Distinction',
    description: 'Systems that can distinguish chronological events and maintain a history log separate from weights.',
    position: [-2, 8, 1],
    connections: []
  },
  {
    id: 'L_OPP_2',
    type: NodeType.LEAF_OPP,
    label: 'Parametric Updates',
    subLabel: 'LoRA / Adapters',
    description: 'Targeted learning via lightweight adapters allows for "learning" without full model retraining.',
    position: [2, 8, -1],
    connections: []
  },
  {
    id: 'L_OPP_3',
    type: NodeType.LEAF_OPP,
    label: 'Cognitive Architecture',
    subLabel: 'RAM vs Disk',
    description: 'Separating Working Memory (RAM) from Long-Term storage (Disk) for more human-like information processing.',
    position: [4, 7, 3],
    connections: []
  }
];