import { Relationship } from "../models/model";
import { BaseNode } from "./baseNode";

export class RootNode extends BaseNode {
  public detached: BaseNode[];
  public relationships: Relationship[] = [];
  constructor(title: string) {
    super(title);
  }

  getRelationships() {
    return this.relationships;
  }

  getDetached() {
    return this.detached;
  }
}
