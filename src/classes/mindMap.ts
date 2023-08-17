import { splitArrayInHalf } from "../utils/util";
import { BaseNode } from "./baseNode";
import { RootNode } from "./rootNode";

export class MindMap {
  private root: RootNode;
  constructor() {}

  getRoot() {
    return this.root;
  }

  createRoot(title: string) {
    this.root = new RootNode(title);
  }

  displayNode(): void {
    const defaultSpace = this.getDefaultSpace();
    const defaultWidth = this.getDefaultWidth();
    const defaultHeight = this.getDefaultHeight();
    const rootX = this.root.getPosition().x;
    const rootY = this.root.getPosition().y;

    const [rightNodes, leftNodes] = splitArrayInHalf(this.root.getChildren());

    rightNodes.forEach((item, index) => {
      const childPositionX = rootX + defaultSpace + defaultWidth;
      const childPositionY =
        rootY + defaultSpace - (defaultSpace + defaultHeight) * index;
      item.setPosition({
        x: childPositionX,
        y: childPositionY,
      });
    });

    leftNodes.forEach((item, index) => {
      const childPositionX = rootX - defaultSpace - defaultWidth;
      const childPositionY =
        rootY + defaultSpace - (defaultSpace + defaultHeight) * index;
      item.setPosition({
        x: childPositionX,
        y: childPositionY,
      });
    });
  }

  getDefaultSpace() {
    return 50;
  }

  getDefaultWidth() {
    return 200;
  }

  getDefaultHeight() {
    return 100;
  }

  getDefault() {
    const defaultSpace = this.getDefaultSpace();
    const defaultWidth = this.getDefaultWidth();
    const defaultHeight = this.getDefaultHeight();

    return { defaultSpace, defaultWidth, defaultHeight}
  }
}
