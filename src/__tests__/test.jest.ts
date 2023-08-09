import { MindMap, Node } from "..";
import { IControlPoints, TRelationship } from "../model";

describe("Create a new mind map file", () => {
  it("should create a root node with four children nodes", () => {
    const xMind = new MindMap();
    expect(xMind.root.children.length).toEqual(4);
  });
});

describe("Create mind map nodes", () => {
  let xMind: MindMap;
  beforeAll(() => {
    xMind = new MindMap();
  });
  it("should create a main topic node", () => {
    const mainTopicFive = xMind.addNode(xMind.root, "Main Topic 5");
    expect(xMind.root.children.length).toEqual(5);
    expect(mainTopicFive.title).toBe("Main Topic 5");
  });
  it("should create a sub topic node", () => {
    const mainTopic1 = xMind.root.children[0];
    const subTopic1 = xMind.addNode(mainTopic1, "Sub Topic 1");
    expect(subTopic1.title).toBe("Sub Topic 1");
    expect(mainTopic1.children.length).toEqual(1);
  });
});

describe("Delete, Update node", () => {
  let xMind: MindMap;
  let mainTopic1, mainTopic2, subTopic1: Node;
  beforeAll(() => {
    xMind = new MindMap();
    mainTopic1 = xMind.root.children[0];
    mainTopic2 = xMind.root.children[1];
    subTopic1 = xMind.addNode(mainTopic1, "Sub Topic 1");
  });

  it("should update node title", () => {
    xMind.updateNodeTitle(subTopic1, "Sub Topic 1 title changed");
    expect(subTopic1.title).toBe("Sub Topic 1 title changed");
  });

  it("should delete a sub topic node", () => {
    xMind.deleteNode(subTopic1);
    expect(mainTopic1.children.length).toEqual(0);
  });

  it("should swap two nodes in the same parent", () => {
    xMind.swapNodesInSameParent(mainTopic1, mainTopic2);
    expect(xMind.root.children[0].title).toBe("Main Topic 2");
    expect(xMind.root.children[1].title).toBe("Main Topic 1");
  });
});

describe("Relocate node", () => {
  let xMind: MindMap;
  let mainTopic1, mainTopic2, subTopic1, subTopic2, subTopic3: Node;

  beforeAll(() => {
    xMind = new MindMap();
    mainTopic1 = xMind.root.children[0];
    mainTopic2 = xMind.root.children[1];
    subTopic1 = xMind.addNode(mainTopic1, "Sub Topic 1");
    subTopic2 = xMind.addNode(subTopic1, "Sub Topic 2");
    subTopic3 = xMind.addNode(subTopic1, "Sub Topic 3");
  });

  it('should relocate subTopic1 node from "main topic 1" to "main topic 2"', () => {
    xMind.relocate(mainTopic2, subTopic1, 0);
    expect(mainTopic2.children.length).toEqual(1);
  });

  it('should relocate subTopic1 node from "main topic 1" to "central topic" (root node)', () => {
    xMind.relocate(xMind.root, subTopic1, 1);
    expect(xMind.root.children.length).toEqual(5);
  });
});

describe("Mind map relationship", () => {
  let xMind: MindMap;
  let mainTopic1, mainTopic2, subTopic1: Node;
  let relationship1, relationship2: TRelationship;

  beforeAll(() => {
    xMind = new MindMap();
    mainTopic1 = xMind.root.children[0];
    mainTopic2 = xMind.root.children[1];
    subTopic1 = xMind.addNode(mainTopic1, "Sub Topic 1");
  });

  it("should create relationship", () => {
    relationship1 = xMind.addRelationship(mainTopic1, subTopic1);
    relationship2 = xMind.addRelationship(mainTopic1, mainTopic2);
    expect(xMind.root.relationships.length).toEqual(2);
  });

  it("should delete relationship", () => {
    xMind.deleteRelationship(relationship1.id);
    expect(xMind.root.relationships.length).toEqual(1);
  });

  it("should update relationship title", () => {
    xMind.updateRelationshipTitle(relationship2, "Belong to");
    expect(relationship2.title).toBe("Belong to");
  });

  it("should update control points", () => {
    const controlPoints: IControlPoints = {
      firstNode: {
        x: 12.265464,
        y: 56.026556
      },
      secondNode: {
        x: 22.36698,
        y: 14.23698
      }
    }
    xMind.updateControlPoints(relationship2, controlPoints)
    expect(relationship2.controlPoints).toEqual(controlPoints)
  })
});
