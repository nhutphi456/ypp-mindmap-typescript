import { removeItemById } from "../utils/util";
import { BaseNode } from "./baseNode";
import { Relationship } from "./relationship";

export class RootNode extends BaseNode {
  private detachedChildren: BaseNode[];
  private relationships: Relationship[];

  constructor(title: string) {
    super(title);
    this.detachedChildren = [];
    this.relationships = [];
  }

  getRelationships(): Relationship[] {
    return this.relationships;
  }

  getDetachedChildren(): BaseNode[] {
    return this.detachedChildren;
  }

  addDetachedNode(title: string): BaseNode {
    const node = new BaseNode(title);
    this.detachedChildren.push(node);
    return node;
  }

  deleteDetachedNode(id: string): void {
    this.detachedChildren = removeItemById(id, this.detachedChildren);
  }

  moveFloatingToChild(detachedNode: BaseNode, targetNode: BaseNode): void {
    targetNode.addChildNode(detachedNode.getTitle());
    this.deleteDetachedNode(detachedNode.getId());
  }

  moveChildToFloating(childNode: BaseNode, parentNode: BaseNode): void {
    parentNode.deleteChildNode(childNode.getId());
    this.addDetachedNode(childNode.getTitle());
  }

  moveChildren(node: BaseNode, fromNode: BaseNode, toNode: BaseNode): void {
    toNode.addChildNode(node.getTitle());
    fromNode.deleteChildNode(node.getId());
  }

  /**
   * MIND MAP RELATIONSHIPS
   */
  addRelationship(firstEnd: BaseNode, secondEnd: BaseNode): Relationship {
    const relationship = new Relationship(firstEnd.getId(), secondEnd.getId());
    this.relationships.push(relationship);
    return relationship;
  }

  deleteRelationship(id: string): void {
    this.relationships = removeItemById(id, this.relationships);
  }

  deleteByIds(idSet: string[]): void {
    //delete children
    this.deleteChildrenByIdSet(idSet)
    //delete floating
    this.deleteDetachedByIdSet(idSet)
  }

  deleteDetachedNodes(idSet: string[]) {
    idSet.forEach((item) => {
      this.deleteDetachedNode(item);
    });
  }

  deleteDetachedByIdSet(idSet: string[]): void {
    this.deleteDetachedNodes(idSet);
    this.detachedChildren.forEach((item) => {
      item.deleteChildrenByIdSet(idSet)
    })
  }
}
