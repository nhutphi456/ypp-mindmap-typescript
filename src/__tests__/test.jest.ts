import { MindMap, RootNode, Node } from "..";

describe("MindMap create node", () => {
  let mindMap: MindMap;

  beforeAll(() => {
    mindMap = new MindMap();
  });

  it("should create a root node", () => {
    const root = mindMap.addRootNode("Main topic");
    expect(root.title).toBe("Main topic");
  });

  it("should create child node", () => {
    const root = mindMap.addRootNode("Main topic");
    const child1 = mindMap.addNode(root.id, "child1");
    const child2 = mindMap.addNode(child1.id, "child2");
    const child3 = mindMap.addNode(root.id, "child3");
    expect(child1.title).toBe("child1");
    expect(child2.title).toBe("child2");
    expect(child3.title).toBe("child3");
  });
});

describe("Mindmap delete, swap node", () => {
  let mindMap: MindMap;
  let root: RootNode;
  let child1, child2, child3, child4, child5, child6: Node;
  beforeEach(() => {
    mindMap = new MindMap();
    root = mindMap.addRootNode("Main topic");
    child1 = mindMap.addNode(root.id, "child1");
    child2 = mindMap.addNode(root.id, "child2");
    child3 = mindMap.addNode(root.id, "child3");
    child4 = mindMap.addNode(child1.id, "child4");
    child5 = mindMap.addNode(child1.id, "child5");
    child6 = mindMap.addNode(child2.id, "child6");
  });

  it("should delete a node", () => {
    mindMap.deleteNode(child2);
    mindMap.deleteNode(child4);
    expect(root.children.length).toBe(2);
    expect(child1.children.length).toBe(1);
  });

  it("should swap node position", () => {
    mindMap.swapNodesInSameParent(child4, child5);
    expect(child1.children[0].title).toBe("child5");
  });
});
