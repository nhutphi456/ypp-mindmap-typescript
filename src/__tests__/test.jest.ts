import { BaseNode } from "../classes/baseNode";
import { MindMap } from "../classes/mindMap";
import { RootNode } from "../classes/rootNode";
import { Points, Relationship } from "../models/model";

describe("Create a new mind map file", () => {
  it("should create a root node with four children nodes", () => {
    const xMind = new MindMap();
    expect(xMind.root.getChildren().length).toEqual(4);
    expect(xMind.root.getChildren()[0].title).toBe("Main Topic 1");
    expect(xMind.root.getChildren()[1].title).toBe("Main Topic 2");
    expect(xMind.root.getChildren()[2].title).toBe("Main Topic 3");
    expect(xMind.root.getChildren()[3].title).toBe("Main Topic 4");
  });
});

describe("Create, Delete, Swap nodes", () => {
  let xMind: MindMap;

  beforeAll(() => {
    xMind = new MindMap();
  });

  it("should create sub topic nodes from main topic nodes", () => {
    const mainTopic1 = xMind.root.getChildren()[0];
    const subTopic1 = new BaseNode("Sub topic 1");
    mainTopic1.addChildNode(subTopic1);
    expect(mainTopic1.getChildren()[0].title).toBe("Sub topic 1");
    expect(mainTopic1.getChildren().length).toEqual(1);
  });

  it("should delete a node", () => {
    const mainTopic1 = xMind.root.getChildren()[0];
    const subTopic1 = mainTopic1.getChildren()[0];
    mainTopic1.deleteChildNode(subTopic1.id);
    expect(mainTopic1.getChildren().length).toEqual(0);
  });

  it("should create a detached node", () => {
    const detachedNode = xMind.root.addDetached("Floating topic");
    const subTopic1 = new BaseNode("Sub topic 1");
    detachedNode.addChildNode(subTopic1);
    expect(detachedNode.title).toBe("Floating topic");
    expect(xMind.root.getDetached().length).toEqual(1);
    expect(detachedNode.getChildren().length).toEqual(1);
  });

  it("should remove a detached node", () => {
    const detachedNode = xMind.root.getDetached()[0];
    xMind.root.deleteDetached(detachedNode.id);
    expect(xMind.root.getDetached().length).toEqual(0);
  });

  it("should swap main topic 3 to main topic 4", () => {
    const mainTopic3 = xMind.root.getChildren()[2];
    const mainTopic4 = xMind.root.getChildren()[3];
    xMind.root.swapTwoNodes(mainTopic3, mainTopic4)

    expect(xMind.root.getChildren()[2].title).toBe("Main Topic 4")
    expect(xMind.root.getChildren()[3].title).toBe("Main Topic 3")
  })
});

describe("Detached node become child node", () => {
  let xMind: MindMap;
  let mainTopic1, detachedNode, subTopic1: BaseNode;

  beforeAll(() => {
    xMind = new MindMap();
    mainTopic1 = xMind.root.getChildren()[0];
    detachedNode = xMind.root.addDetached("Floating topic");
    subTopic1 = new BaseNode("Sub topic 1");
    detachedNode.addChildNode(subTopic1);
  });

  it("should detached become child node", () => {
    //remove detached from root
    xMind.root.deleteDetached(detachedNode.id);
    //add detached node to main topic node
    mainTopic1.addChildNode(detachedNode);
    expect(mainTopic1.getChildren().length).toEqual(1);
    expect(xMind.root.getDetached().length).toEqual(0);
  });
});

describe("Mind map relationship", () => {
  let xMind: MindMap;
  let root: RootNode;
  let mainTopic1, mainTopic2, subTopic1: BaseNode;
  let relationship1, relationship2: Relationship;

  beforeAll(() => {
    xMind = new MindMap();
    root = xMind.root;
    mainTopic1 = xMind.root.getChildren()[0];
    mainTopic2 = xMind.root.getChildren()[1];
    subTopic1 = new BaseNode("Sub Topic 1");
    mainTopic1.addChildNode(subTopic1);
  });

  it("should create relationship", () => {
    relationship1 = root.addRelationship(mainTopic1, subTopic1);
    relationship2 = root.addRelationship(mainTopic1, mainTopic2);
    expect(root.getRelationships().length).toEqual(2);
  });

  it("should delete relationship", () => {
    root.deleteRelationship(relationship1.id);
    expect(xMind.root.getRelationships().length).toEqual(1);
  });

  it("should update relationship title", () => {
    root.updateRelationshipTitle(relationship2, "Belong to");
    expect(relationship2.title).toBe("Belong to");
  });

  it("should update control points", () => {
    const controlPoints: Points = {
      firstNode: {
        x: 12.265464,
        y: 56.026556,
      },
      secondNode: {
        x: 22.36698,
        y: 14.23698,
      },
    };
    root.updateControlPoints(relationship2, controlPoints);
    expect(relationship2.controlPoints).toEqual(controlPoints);
  });

  it("should update line end points", () => {
    const lineEndPoints: Points = {
      firstNode: {
        x: 12.265464,
        y: 56.026556,
      },
      secondNode: {
        x: 22.36698,
        y: 14.23698,
      },
    };
    root.updateLineEndPoints(relationship2, lineEndPoints);
    expect(relationship2.controlPoints).toEqual(lineEndPoints);
  });
});
