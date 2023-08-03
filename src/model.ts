export interface IMindMap {
  id: string;
  root: IRootNode | null;
}
export interface IChildNode {
  id: string;
  title: string;
  children: IChildNode[] | null;
}
export interface IRootNode extends IChildNode {
  relationships: IRelationship[] | null;
  customWidth?: number;
  position?: IPointCoordinate;
}

export interface IRelationship {
  id: string;
  firstEndId: string;
  secondEndId: string;
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
