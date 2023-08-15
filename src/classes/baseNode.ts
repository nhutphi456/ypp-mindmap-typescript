import { v4 as uuidv4 } from "uuid";
import { Position } from "../models/model";
import { removeItemById, swap } from "../utils/util";

export class BaseNode {
  private id: string;
  private title: string;
  protected children: BaseNode[];
  private position: Position;
  public width: number;
  public height: number;

  constructor(title: string) {
    this.id = uuidv4().toString();
    this.title = title;
    this.children = [];
  }

  getId (): string {
    return this.id
  }
  getChildren(): BaseNode[] {
    return this.children;
  }

  getTitle(): string {
    return this.title;
  }

  getPosition(): Position {
    return this.position
  }

  setPosition(position: Position): void {
    this.position = position
  }

  addChildNode(title: string): BaseNode {
    const node = new BaseNode(title);
    this.children.push(node);
    return node;
  }

  deleteChildNode(id: string): void {
    this.children = removeItemById(id, this.children);
  }

  deleteChildrenNodes(nodeIds: string[]): void {
    nodeIds.forEach((id) => {
      this.deleteChildNode(id)
    });
  }

  deleteChildrenByIdSet(idSet: string[]): void {
    this.deleteChildrenNodes(idSet);
    this.children.forEach((item) => {
      item.deleteChildrenByIdSet(idSet);
    });
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
