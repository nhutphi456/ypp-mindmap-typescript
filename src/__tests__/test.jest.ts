import { MindMap, Node } from "..";

describe("Create a new mind map file", () => {
  it("should create a root node with four children nodes", () => {
    const xMind = new MindMap();
    expect(xMind.root.children.length).toEqual(4);
  });
});

describe("Create children node", () => {
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

  it("should swap two nodes in same parent", () => {
    xMind.swapNodesInSameParent(mainTopic1, mainTopic2)
    expect(xMind.root.children[0].title).toBe("Main Topic 2")
    expect(xMind.root.children[1].title).toBe("Main Topic 1")
  });
});

