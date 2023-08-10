export type Relationship = {
  id: string;
  firstEndId: string;
  secondEndId: string;
  title?: string;
  controlPoints?: Points;
  lineEndPoints?: Points;
}

export type Points = {
  firstNode: PointCoordinate;
  secondNode: PointCoordinate;
}

export type PointCoordinate = {
  x: number;
  y: number;
}


export interface Children {
  attached: Node[],
  detached: Node[]
}