import { Points, Relationship } from "../models/model";
import { removeItemById } from "../utils/util";
import { BaseNode } from "./baseNode";
import { Node } from "./node";
import { v4 as uuidv4 } from "uuid";

export class RootNode extends BaseNode {
  public detached: BaseNode[];
  public relationships: Relationship[];
  constructor(title: string) {
    super(title);
    this.detached = [];
    this.relationships = [];
  }

  getRelationships() {
    return this.relationships;
  }

  getDetached() {
    return this.detached;
  }

  addDetached(title: string): BaseNode {
    const detachedNode = new BaseNode(title);
    this.detached.push(detachedNode);
    return detachedNode;
  }

  deleteDetached(id: string): void {
    this.detached = removeItemById(id, this.detached);
  }

  /**
   * MIND MAP RELATIONSHIPS
   */
  addRelationship(firstEnd: Node, secondEnd: Node): Relationship {
    const relationship: Relationship = {
      id: uuidv4(),
      firstEndId: firstEnd.id,
      secondEndId: secondEnd.id,
    };
    this.relationships.push(relationship);
    return relationship;
  }

  deleteRelationship(id: string): void {
    this.relationships = removeItemById(id, this.relationships)
  }

  updateRelationshipTitle(relationship: Relationship, title: string): void {
    const foundRelationship = this.findRelationshipById(relationship.id);
    if (!foundRelationship) return;
    Object.assign(foundRelationship, { title });
  }

  updateControlPoints(relationship: Relationship, controlPoints: Points): void {
    const foundRelationship = this.findRelationshipById(relationship.id);
    if (!foundRelationship) return;
    relationship.controlPoints = controlPoints;
  }

  updateLineEndPoints(relationship: Relationship, lineEndPoints: Points): void {
    const foundRelationship = this.findRelationshipById(relationship.id);
    if (!foundRelationship) return;
    relationship.lineEndPoints = lineEndPoints;
  }

  findRelationshipById(id: string): Relationship | undefined {
    const rootRelationships = this.relationships;
    const relationshipIndex = rootRelationships.findIndex(
      (relationship) => relationship.id === id
    );
    if (relationshipIndex < 0) return undefined;
    return rootRelationships[relationshipIndex];
  }
}
