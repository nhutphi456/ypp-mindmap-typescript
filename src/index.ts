import { IPointCoordinate, IRelationship } from "./model";
import { swap, uniqueID } from "./utils/util";
export class MindMap {
  public root: RootNode = new RootNode("Central Topic");
  constructor() {
    const defaultChildren = this.createDefaultChildrenNode();
    this.root.children = defaultChildren;
  }

  private createDefaultChildrenNode(): Node[] {
    const defaultChildren: Node[] = [
      new Node("Main Topic 1"),
      new Node("Main Topic 2"),
      new Node("Main Topic 3"),
      new Node("Main Topic 4"),
    ];

    defaultChildren.forEach((child: Node) => (child.parentId = this.root.id));

    return defaultChildren;
  }
  addNode(parentNode: Node, title: string): Node | null {
    const parent = this.findNode(this.root, parentNode.id);
    if (!parent) return null;
    const node = new Node(title);
    node.parentId = parent.id;
    parent.children.push(node);
    return node;
  }

  findNode(node: Node, id: string): Node {
    if (node.id === id) {
      return node;
    }

    for (const child of node.children) {
      const result = this.findNode(child, id);
      if (result) {
        return result;
      }
    }

    return null;
  }

  deleteNode(node: Node) {
    const parent = this.findNode(this.root, node.parentId);
    if (!parent) return null;
    parent.children = parent.children.filter((child) => child.id !== node.id);
  }

  updateNodeTitle(node: Node, newTitle: string): void {
    const foundNode = this.findNode(this.root, node.id);
    if (!foundNode) return null;
    foundNode.title = newTitle;
  }

  swapNodesInSameParent(firstNode: Node, secondNode: Node) {
    const nodeParentId = firstNode.parentId;
    const parent = this.findNode(this.root, nodeParentId);
    if (!parent) return null;
    const childrenArr = parent.children;
    const firstNodeIdx = childrenArr.findIndex(
      (child) => child.id === firstNode.id
    );
    const secondNodeIdx = childrenArr.findIndex(
      (child) => child.id === secondNode.id
    );
    swap(firstNodeIdx, secondNodeIdx, childrenArr);
  }
}

export class Node {
  public id: string = uniqueID();
  public parentId: string | null;
  public title: string;
  public children: Node[] = [];
  public customWidth?: number;
  public position?: IPointCoordinate;

  constructor(title: string) {
    this.title = title;
  }
}
export class RootNode extends Node {
  public relationships: IRelationship[];
  constructor(title: string) {
    super(title);
  }
}
