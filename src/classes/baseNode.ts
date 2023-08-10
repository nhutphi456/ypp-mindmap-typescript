import { v4 as uuidv4 } from "uuid";
import { PointCoordinate } from "../models/model";
import { Node } from "./node";

export class BaseNode {
  public id: string;
  public title: string;
  public children: BaseNode[]
  public customWidth: number;
  public position: PointCoordinate;

  constructor(title: string) {
    this.id = uuidv4();
    this.title = title;
    this.children = []
  }

  getChildren() {
    return this.children;
  }

  addChildNode(title: string): BaseNode {
    const node = new BaseNode(title)
    this.children.push(node)
    return node
  }

  deleteChildNode(id: string): void {
    const newChildren = this.children.filter(child => child.id !== id)
    this.children = newChildren
  }
}
