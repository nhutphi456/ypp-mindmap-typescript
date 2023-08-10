import { v4 as uuidv4 } from "uuid";
import { PointCoordinate } from "../models/model";
import { Node } from "./node";

export class BaseNode {
  public id: string;
  public parentId: string | null;
  public title: string;
  public children: {
    attached?: BaseNode[];
    detached?: BaseNode[];
  };
  public customWidth: number;
  public position: PointCoordinate;

  constructor(title: string) {
    this.id = uuidv4();
    this.title = title;
    this.children = {};
  }
  getChildren() {
    return this.children;
  }

  getAttachedChildren(): BaseNode[] {
    return this.children.attached;
  }

  getDetachedChildren() {
    return this.children.detached;
  }

  setAttachedChildren(attached: Node[]) {
    this.children.attached = attached;
  }

  setDetachedChildren(detached: Node[]) {
    this.children.detached = detached;
  }

  addAttchedChild(title: string = "Sub topic 1"): BaseNode {
    const node = new BaseNode(title);
    if (this.children.hasOwnProperty("attached")) {
      this.setDetachedChildren([...this.getAttachedChildren(), node]);
    }
    this.setAttachedChildren([node]);
    return node;
  }

  deleteAttachedChild(id: string): void {
    const newAttached = this.getAttachedChildren().filter(
      (item) => item.id !== id
    );
    this.setAttachedChildren(newAttached);
  }
}
