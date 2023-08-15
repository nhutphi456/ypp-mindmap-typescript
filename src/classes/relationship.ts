import { Points } from "../models/model";
import { v4 as uuidv4 } from "uuid";
import { BaseNode } from "./baseNode";

export class Relationship {
  id: string;
  firstEndId: string;
  secondEndId: string;
  title: string;
  controlPoints: Points;
  lineEndPoints: Points;

  constructor(firstEndId: string, secondEndId: string) {
    this.id = uuidv4();
    this.firstEndId = firstEndId;
    this.secondEndId = secondEndId;
  }

  setTitle(title: string): void {
    this.title = title;
  }

  setControlPoints(controlPoints: Points): void {
    this.controlPoints = controlPoints;
  }

  setLineEndPoints(lineEndPoints: Points): void {
    this.lineEndPoints = lineEndPoints;
  }

  updateEndsNode(
    firstEndNode: BaseNode,
    secondEndNode: BaseNode,
    controlPoints: Points
  ): void {
    this.firstEndId = firstEndNode.getId();
    this.secondEndId = secondEndNode.getId();
    this.controlPoints = controlPoints;
  }
}
