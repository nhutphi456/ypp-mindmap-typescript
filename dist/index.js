"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootNode = exports.Node = exports.MindMap = void 0;
const util_1 = require("./utils/util");
class MindMap {
    constructor(root = null) {
        this.root = root;
    }
    addRootNode(title) {
        const rootNodeId = (0, util_1.uniqueID)();
        const rootNode = new RootNode(rootNodeId, null, title);
        this.root = rootNode;
        return rootNode;
    }
    addNode(parentId, title) {
        const parent = this.findNode(this.root, parentId);
        if (!parent)
            return null;
        const nodeId = (0, util_1.uniqueID)();
        const node = new Node(nodeId, parent.id, title);
        parent.children.push(node);
        return node;
    }
    findNode(node, id) {
        if (node.id === id) {
            return node;
        }
        for (const child of node.children) {
            const result = this.findNode(child, id);
            if (result) {
                return result;
            }
        }
        return null;
    }
    deleteNode(node) {
        const parent = this.findNode(this.root, node.parentId);
        if (!parent)
            return null;
        parent.children = parent.children.filter((child) => child.id !== node.id);
    }
    switchNodesWithSameParent(firstNode, secondNode) {
        const nodeParentId = firstNode.parentId;
        const parent = this.findNode(this.root, nodeParentId);
        if (!parent)
            return null;
        const childrenArr = parent.children;
        const firstNodeIdx = childrenArr.findIndex((child) => child.id === firstNode.id);
        const secondNodeIdx = childrenArr.findIndex((child) => child.id === secondNode.id);
        (0, util_1.swap)(firstNodeIdx, secondNodeIdx, childrenArr);
    }
}
exports.MindMap = MindMap;
class Node {
    constructor(id, parentId, title, children = []) {
        this.id = id;
        this.parentId = parentId;
        this.title = title;
        this.children = children;
    }
}
exports.Node = Node;
class RootNode extends Node {
    constructor(id, parentId, title, children = [], relationships = [], customWidth, position) {
        super(id, parentId, title, children);
        this.relationships = relationships;
        this.customWidth = customWidth;
        this.position = position;
    }
}
exports.RootNode = RootNode;
let mindMap = new MindMap();
const root = mindMap.addRootNode("Main topic");
const child1 = mindMap.addNode(root.id, "child1");
const child2 = mindMap.addNode(child1.id, "child2");
// console.log(root);
//# sourceMappingURL=index.js.map