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
