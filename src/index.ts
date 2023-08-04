import { IPointCoordinate, IRelationship } from "./model";
import { swap, uniqueID } from "./utils/util";
export class MindMap {
  constructor(private root: RootNode = null) {}

  addRootNode(title: string): RootNode {
    const rootNodeId = uniqueID();
    const rootNode = new RootNode(rootNodeId, null, title);
    this.root = rootNode;
    return rootNode;
  }

  addNode(parentId: string, title: string): Node | null {
    const parent = this.findNode(this.root, parentId);
    if (!parent) return null;
    const nodeId = uniqueID();
    const node = new Node(nodeId, parent.id, title);
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

  updateNodeTitle(node: Node, newTitle: string): void {
    const foundNode = this.findNode(this.root, node.id)
    if(!foundNode) return null
    foundNode.title = newTitle
  }
}

export class Node {
  constructor(
    public id: string,
    public parentId: string | null,
    public title: string,
    public children: Node[] = [],
    public customWidth?: number,
    public position?: IPointCoordinate
    ) {}
}
export class RootNode extends Node {
  constructor(
    id: string,
    parentId: null,
    title: string,
    children: Node[] = [],
    customWidth?: number,
    position?: IPointCoordinate,
    public relationships: IRelationship[] = [],
  ) {
    super(id, parentId, title, children, customWidth, position);
  }
}

let mindMap = new MindMap();
const root = mindMap.addRootNode("Main topic");
const child1 = mindMap.addNode(root.id, "child1");
const child2 = mindMap.addNode(child1.id, "child2");
// console.log(root);
