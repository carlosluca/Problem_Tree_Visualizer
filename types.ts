export enum NodeType {
  ROOT = 'ROOT',
  TRUNK = 'TRUNK',
  BRANCH = 'BRANCH',
  LEAF_GAP = 'LEAF_GAP',
  LEAF_OPP = 'LEAF_OPP'
}

export interface NodeData {
  id: string;
  type: NodeType;
  label: string;
  subLabel?: string;
  description: string;
  position: [number, number, number];
  connections: string[]; // IDs of nodes this connects TO
}

export interface AppState {
  selectedNode: string | null;
  setSelectedNode: (id: string | null) => void;
  hoveredNode: string | null;
  setHoveredNode: (id: string | null) => void;
}
