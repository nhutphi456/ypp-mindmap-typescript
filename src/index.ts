import { Points, PointCoordinate, Relationship } from "./model";
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

    if (firstNodeIdx < 0 || secondNodeIdx < 0) return;
    swap(firstNodeIdx, secondNodeIdx, childrenArr);
  }

  relocate(toNode: Node, node: Node, order: number): void {
    //remove child from current node
    const fromParent = this.findNode(this.root, node.parentId);
    if (!fromParent) return;
    fromParent.children.filter((child) => child.id === node.id);
    //add child to new node
    const toParent = this.findNode(this.root, toNode.id);
    if (!toParent) return;
    toParent.children.splice(order, 0, node);
  }

  /**
   * MIND MAP RELATIONSHIPS
   */
  addRelationship(firstEnd: Node, secondEnd: Node): Relationship {
    const relationship: Relationship = {
      id: uniqueID(),
      firstEndId: firstEnd.id,
      secondEndId: secondEnd.id,
    };
    this.root.relationships.push(relationship);
    return relationship;
  }

  deleteRelationship(id: string): void {
    this.root.relationships = this.root.relationships.filter(
      (relationship) => relationship.id !== id
    );
  }

  updateRelationshipTitle(relationship: Relationship, title: string): void {
    const foundRelationship = this.findRelationshipById(relationship.id);
    if (!foundRelationship) return;
    Object.assign(foundRelationship, { title });
  }

  updateControlPoints(relationship: Relationship, controlPoints: Points): void {
    const foundRelationship = this.findRelationshipById(relationship.id);
    if (!foundRelationship) return;
    relationship.controlPoints = controlPoints;
  }

  updateLineEndPoints(relationship: Relationship, lineEndPoints: Points): void {
    const foundRelationship = this.findRelationshipById(relationship.id);
    if (!foundRelationship) return;
    relationship.lineEndPoints = lineEndPoints;
  }

  findRelationshipById(id: string): Relationship | undefined {
    const rootRelationships = this.root.relationships;
    const relationshipIndex = rootRelationships.findIndex(
      (relationship) => relationship.id === id
    );
    if (relationshipIndex < 0) return undefined;
    return rootRelationships[relationshipIndex];
  }
}

export class Node {
  public id: string = uniqueID();
  public parentId: string | null;
  public title: string;
  public children: Node[] = [];
  public customWidth?: number;
  public position?: PointCoordinate;

  constructor(title: string) {
    this.title = title;
  }
}
export class RootNode extends Node {
  public relationships: Relationship[] = [];
  constructor(title: string) {
    super(title);
  }
}
