import { Relationship } from "../models/model";
import { removeItemById } from "../utils/util";
import { BaseNode } from "./baseNode";

export class RootNode extends BaseNode {
  public detached: BaseNode[];
  public relationships: Relationship[];
  constructor(title: string) {
    super(title);
    this.detached = [];
    this.relationships = [];
  }

  getRelationships() {
    return this.relationships;
  }

  getDetached() {
    return this.detached;
  }

  addDetached(title: string): BaseNode {
    const detachedNode = new BaseNode(title);
    this.detached.push(detachedNode);
    return detachedNode;
  }

  deleteDetached(id: string): void {
    this.detached = removeItemById(id, this.detached)
  }
}
