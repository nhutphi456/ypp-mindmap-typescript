export interface INode {
  id: string;
  parentId: string | null;
  title: string;
  children: INode[];
  customWidth?: number;
  position?: IPointCoordinate;
}

export interface IRootNode extends INode{
  relationships: IRelationship[]
} 
export interface IRelationship {
  id: string;
  firstEndId: string;
  secondEndId: string;
  title?: string;
  controlPoints: IControlPoints;
  lineEndPoints: ILineEndPoints;
}

export interface IControlPoints {
  firstNode: IPointCoordinate;
  secondNode: IPointCoordinate;
}

export interface ILineEndPoints {
  firstNode: IPointCoordinate;
  secondNode: IPointCoordinate;
}

export interface IPointCoordinate {
  x: number;
  y: number;
}


