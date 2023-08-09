// export interface INode {
//   id: string;
//   parentId: string | null;
//   title: string;
//   children: INode[];
//   customWidth?: number;
//   position?: PointCoordinate;
// }

// export interface IRootNode extends INode{
//   relationships: Relationship[]
// } 
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


