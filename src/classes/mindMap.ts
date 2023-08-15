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

  displayNode() {
    const defaultSpace = this.getDefaultSpace();
    const defaultWidth = this.getDefaultWidth();
    const defaultHeight = this.getDefaultHeight();

    this.root.getChildren().forEach((item, index) => {
      const childPositionX = defaultSpace + defaultWidth;
      const childPositionY = (defaultSpace + defaultHeight) * index;
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
    return 150;
  }
}
