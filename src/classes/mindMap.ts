import { v4 as uuidv4 } from "uuid";
import { Points, Relationship } from "../models/model";
import { Node } from "./node";
import { RootNode } from "./rootNode";

export class MindMap {
  public id: string
  public root: RootNode = new RootNode("Central Topic");
  constructor() {
    this.id = uuidv4()
    const defaultChildren = this.createDefaultChildrenNode();
    this.root.children = defaultChildren
  }

  private createDefaultChildrenNode(): Node[] {
    const defaultChildren: Node[] = [
      new Node("Main Topic 1"),
      new Node("Main Topic 2"),
      new Node("Main Topic 3"),
      new Node("Main Topic 4"),
    ];
    return defaultChildren;
  }
}
