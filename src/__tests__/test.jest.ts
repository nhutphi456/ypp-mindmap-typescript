import { BaseNode } from "../classes/baseNode";
import { MindMap } from "../classes/mindMap";
import { Relationship } from "../classes/relationship";
import { RootNode } from "../classes/rootNode";

const initMindMap = (): MindMap => {
  const xMind = new MindMap();
  xMind.createRoot("Central Topic");

  const root = xMind.getRoot();
  root.addChildNode("Main Topic 1");
  root.addChildNode("Main Topic 2");
  root.addChildNode("Main Topic 3");
  root.addChildNode("Main Topic 4");

  return xMind;
};

describe("Create a new mind map file", () => {
  let root: RootNode;

  beforeAll(() => {
    root = initMindMap().getRoot();
  });

  it("should create a root node with four children nodes", () => {
    expect(root.getTitle()).toEqual("Central Topic");
    expect(root.getChildren().length).toEqual(4);
    expect(root.getChildren()[0].getTitle()).toBe("Main Topic 1");
    expect(root.getChildren()[1].getTitle()).toBe("Main Topic 2");
    expect(root.getChildren()[2].getTitle()).toBe("Main Topic 3");
    expect(root.getChildren()[3].getTitle()).toBe("Main Topic 4");
  });

  it("should create sub topic nodes from main topic nodes", () => {
    const mainTopic1 = root.getChildren()[0];

    mainTopic1.addChildNode("Sub topic 1");

    expect(mainTopic1.getChildren()[0].getTitle()).toBe("Sub topic 1");
    expect(mainTopic1.getChildren().length).toEqual(1);
  });

  it("should delete a node", () => {
    const mainTopic1 = root.getChildren()[0];
    const subTopic1 = mainTopic1.getChildren()[0];

    mainTopic1.deleteChildNode(subTopic1.getId());

    expect(mainTopic1.getChildren().length).toEqual(0);
  });

  it("should create a detached node", () => {
    const detachedNode = root.addDetachedNode("Floating topic");

    expect(detachedNode.getTitle()).toBe("Floating topic");
    expect(root.getDetachedChildren().length).toEqual(1);
  });

  it("should create child node for detached node", () => {
    const detachedNode = root.getDetachedChildren()[0];

    detachedNode.addChildNode("Sub topic 1");

    expect(detachedNode.getChildren().length).toEqual(1);
    expect(detachedNode.getChildren()[0].getTitle()).toBe("Sub topic 1");
  });

  it("should remove a detached node", () => {
    const detachedNode = root.getDetachedChildren()[0];

    expect(root.getDetachedChildren().length).toEqual(1);

    root.deleteDetachedNode(detachedNode.getId());

    expect(root.getDetachedChildren().length).toEqual(0);
  });

  it("should swap main topic 3 to main topic 4", () => {
    const mainTopic3 = root.getChildren()[2];
    const mainTopic4 = root.getChildren()[3];

    root.swapTwoNodes(mainTopic3, mainTopic4);

    expect(root.getChildren()[2].getTitle()).toBe("Main Topic 4");
    expect(root.getChildren()[3].getTitle()).toBe("Main Topic 3");
  });
});

describe("Test floating topic", () => {
  let root: RootNode;
  let mainTopic1, subTopic1, detachedNode: BaseNode;

  beforeAll(() => {
    root = initMindMap().getRoot();
    mainTopic1 = root.getChildren()[0];
    subTopic1 = mainTopic1.addChildNode("Sub topic 1");
    detachedNode = root.addDetachedNode("Floating topic");
  });

  it("should floating topic become child of main topic 1", () => {
    root.moveFloatingToChild(detachedNode, mainTopic1);

    expect(mainTopic1.getChildren().length).toEqual(2);
    expect(root.getDetachedChildren().length).toEqual(0);
  });

  it("should sub topic 1 become floating topic", () => {
    root.moveChildToFloating(subTopic1, mainTopic1);

    expect(mainTopic1.getChildren().length).toEqual(1);
    expect(root.getDetachedChildren().length).toEqual(1);
  });
});

describe("Test move child", () => {
  let root: RootNode;
  let mainTopic1, mainTopic2, subTopic1: BaseNode;

  beforeAll(() => {
    root = initMindMap().getRoot();
    mainTopic1 = root.getChildren()[0];
    mainTopic2 = root.getChildren()[1];
    subTopic1 = mainTopic1.addChildNode("Sub topic 1");
  });

  it("should move child from main topic 1 to main topic 2", () => {
    root.moveChildren(subTopic1, mainTopic1, mainTopic2);

    expect(mainTopic1.getChildren().length).toEqual(0);
    expect(mainTopic2.getChildren().length).toEqual(1);
    expect(mainTopic2.getChildren()[0].title).toBe("Sub topic 1");
  });
});

describe("Test delete multiple nodes of same parent", () => {
  let root: RootNode;
  let mainTopic1, subTopic1, subTopic2, subTopic3, subTopic4: BaseNode;

  beforeAll(() => {
    root = initMindMap().getRoot();
    mainTopic1 = root.getChildren()[0];
    subTopic1 = mainTopic1.addChildNode("Sub topic 1");
    subTopic2 = mainTopic1.addChildNode("Sub topic 2");
    subTopic3 = mainTopic1.addChildNode("Sub topic 3");
    subTopic4 = mainTopic1.addChildNode("Sub topic 4");
  });

  it("should delete all four sub topic node from main topic 1", () => {
    expect(mainTopic1.getChildren().length).toEqual(4);

    mainTopic1.deleteChildrenNodes([
      subTopic1.getId(),
      subTopic2.getId(),
      subTopic3.getId(),
      subTopic4.getId(),
    ]);

    expect(mainTopic1.getChildren().length).toEqual(0);
  });
});

describe("Test delete multiple nodes", () => {
  let root: RootNode;
  let mainTopic1, mainTopic2, subTopic1, subTopic12, detachedTopic: BaseNode;

  beforeAll(() => {
    root = initMindMap().getRoot();
    mainTopic1 = root.getChildren()[0];
    mainTopic2 = root.getChildren()[1];
    subTopic1 = mainTopic1.addChildNode("Sub topic 1");
    subTopic12 = subTopic1.addChildNode("Sub topic 12");
    detachedTopic = root.addDetachedNode("Floating topic");
  });

  it("should delete mainTopic2, subTopic12, and detachedTopic nodes", () => {
    expect(root.getChildren().length).toEqual(4);
    expect(subTopic1.getChildren().length).toEqual(1);
    expect(root.getDetachedChildren().length).toEqual(1);

    const deleledNodeIds = [
      mainTopic2.getId(),
      subTopic12.getId(),
      detachedTopic.getId(),
    ];

    root.deleteByIds(deleledNodeIds);

    expect(root.getChildren().length).toEqual(3);
    expect(subTopic1.getChildren().length).toEqual(0);
    expect(root.getDetachedChildren().length).toEqual(0);
  });
});

//RELATIONSHIPS
describe("Test mind map relationship", () => {
  let root: RootNode;
  let mainTopic1, mainTopic2, subTopic1: BaseNode;
  let relationship1, relationship2: Relationship;

  beforeAll(() => {
    root = initMindMap().getRoot();
    mainTopic1 = root.getChildren()[0];
    mainTopic2 = root.getChildren()[1];
    subTopic1 = new BaseNode("Sub Topic 1");
    mainTopic1.addChildNode(subTopic1);
  });

  it("should create relationship", () => {
    relationship1 = root.addRelationship(mainTopic1.getId(), subTopic1.getId());
    relationship2 = root.addRelationship(
      mainTopic1.getId(),
      mainTopic2.getId()
    );

    expect(root.getRelationships().length).toEqual(2);
  });

  it("should delete relationship", () => {
    expect(root.getRelationships().length).toEqual(2);

    root.deleteRelationship(relationship1.id);

    expect(root.getRelationships().length).toEqual(1);
  });

  it("should update relationship", () => {
    const mainTopic3 = root.getChildren()[2];
    const newControlPoints = {
      x: 15,
      y: 20,
    };

    relationship1.updateEndsNode(mainTopic1, mainTopic3, newControlPoints);

    expect(relationship1.controlPoints).toEqual(newControlPoints);
    expect(relationship1.firstEndId).toEqual(mainTopic1.getId());
    expect(relationship1.secondEndId).toEqual(mainTopic3.getId());
  });
});

describe("draw mind map", () => {
  let xMind: MindMap;

  beforeAll(() => {
    xMind = initMindMap();
  });

  it("should display nodes", () => {
    xMind.displayNode();
    const root = xMind.getRoot();
    const mainTopic1 = root.getChildren()[0];
    const mainTopic2 = root.getChildren()[1];
    const mainTopic3 = root.getChildren()[2];
    const mainTopic4 = root.getChildren()[3];

    expect(mainTopic1.getPosition().x).toEqual(250);
    expect(mainTopic1.getPosition().y).toEqual(50);

    expect(mainTopic2.getPosition().x).toEqual(250);
    expect(mainTopic2.getPosition().y).toEqual(-100);

    expect(mainTopic3.getPosition().x).toEqual(-250);
    expect(mainTopic3.getPosition().y).toEqual(50);

    expect(mainTopic4.getPosition().x).toEqual(-250);
    expect(mainTopic4.getPosition().y).toEqual(-100);
  });
})