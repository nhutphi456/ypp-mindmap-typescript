import { v4 as uuidv4 } from "uuid";
import { PointCoordinate } from "../models/model";
import { removeItemById, swap } from "../utils/util";

export class BaseNode {
  public id: string;
  public title: string;
  public children: BaseNode[];
  public customWidth: number;
  public position: PointCoordinate;

  constructor(title: string) {
    this.id = uuidv4();
    this.title = title;
    this.children = [];
  }

  getChildren() {
    return this.children;
  }

  addChildNode(node: BaseNode): BaseNode {
    this.children.push(node);
    return node;
  }

  deleteChildNode(id: string): void {
    this.children = removeItemById(id, this.children);
  }

  swapTwoNodes(firstNode: BaseNode, secondNode: BaseNode): void {
    const firstNodeIndex = this.children.findIndex(
      (child) => child.id === firstNode.id
    );
    const secondNodeIndex = this.children.findIndex(
      (child) => child.id === secondNode.id
    );
    swap(firstNodeIndex, secondNodeIndex, this.children);
  }
}
