import {
    Theme,
    Extension,
    Relationship,
    Root,
    RootTopic,
    Children,
  } from "./model";
  
  class RootNode implements Root {
    constructor(
      public id: string,
      public rootTopic: RootTopic,
      public relationships: Relationship[],
      public title: string,
      public extensions: Extension[],
      public theme: Theme
    ) {}
  
    createRelationship(end1Id: string, end2Id: string): void {
      const newRelationship = {
        id: Math.random().toString(),
        end1Id,
        end2Id,
      };
      this.relationships.push(newRelationship);
    }
  
    updateRelationship(relationship: Relationship): void {}
    deleteRelationship(id: string): void {}
  }
  
  class RootTopicNode implements RootTopic {
    constructor(
      public id: string,
      public title: string,
      public children: Children
    ) {}
  
    createSub(id: string, subTitle: string): void {}
  
    updateSubTitle(id: string, title: string): void {}
  
    deleteSub(subId: string): void {}
  
    switchTwoSubs(firstId: string, secondId: string): void {}
  }
  
  class AttachedNode extends RootTopicNode {
    constructor(
      public id: string,
      public title: string,
      public children: Children
    ) {
      super(id, title, children);
    }
  }
  