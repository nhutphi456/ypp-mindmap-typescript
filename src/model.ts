export interface Root {
  id: string
//   class: string
  rootTopic: RootTopic
  relationships: Relationship[]
  title: string
  extensions: Extension[]
  theme: Theme
}

export interface RootTopic {
  id: string
//   class: string
  title: string
  children: Children
}

export interface Children {
  attached: Attached[]
}

export interface Attached {
  id: string
  title: string
  children: Children2
}

export interface Children2 {
  attached: Attached2[]
}

export interface Attached2 {
  id: string
  title: string
}

export interface Relationship {
  id: string
  end1Id: string
  end2Id: string
  controlPoints?: ControlPoints
  lineEndPoints?: LineEndPoints
}

export interface ControlPoints {
  "0": N0
  "1": N1
}

export interface N0 {
  x: number
  y: number
}

export interface N1 {
  x: number
  y: number
}

export interface LineEndPoints {
  "0": N02
  "1": N12
}

export interface N02 {
  x: number
  y: number
}

export interface N12 {
  x: number
  y: number
}

export interface Extension {
  provider: string
  content: Content
}

export interface Content {
  centralTopic: string
  mainTopic: string
}

export interface Theme {
  centralTopic: CentralTopic
  mainTopic: MainTopic
  subTopic: SubTopic
  calloutTopic: CalloutTopic
  summaryTopic: SummaryTopic
  floatingTopic: FloatingTopic
  importantTopic: ImportantTopic
  minorTopic: MinorTopic
  expiredTopic: ExpiredTopic
  boundary: Boundary
  summary: Summary
  relationship: Relationship2
  map: Map
  skeletonThemeId: string
  colorThemeId: string
}

export interface CentralTopic {
  id: string
  properties: Properties
}

export interface Properties {
  "fo:font-family": string
  "fo:font-size": string
  "fo:font-weight": string
  "fo:font-style": string
  "fo:color": string
  "fo:text-transform": string
  "fo:text-decoration": string
  "fo:text-align": string
  "svg:fill": string
  "fill-pattern": string
  "line-width": string
  "line-color": string
  "line-pattern": string
  "border-line-color": string
  "border-line-width": string
  "border-line-pattern": string
  "shape-class": string
  "line-class": string
  "arrow-end-class": string
  "alignment-by-level": string
}

export interface MainTopic {
  id: string
  properties: Properties2
}

export interface Properties2 {
  "fo:font-family": string
  "fo:font-size": string
  "fo:font-weight": string
  "fo:font-style": string
  "fo:color": string
  "fo:text-transform": string
  "fo:text-decoration": string
  "fo:text-align": string
  "svg:fill": string
  "fill-pattern": string
  "line-width": string
  "line-color": string
  "line-pattern": string
  "border-line-color": string
  "border-line-width": string
  "border-line-pattern": string
  "shape-class": string
  "line-class": string
  "arrow-end-class": string
}

export interface SubTopic {
  id: string
  properties: Properties3
}

export interface Properties3 {
  "fo:font-family": string
  "fo:font-size": string
  "fo:font-weight": string
  "fo:font-style": string
  "fo:color": string
  "fo:text-transform": string
  "fo:text-decoration": string
  "fo:text-align": string
  "svg:fill": string
  "fill-pattern": string
  "line-width": string
  "line-color": string
  "line-pattern": string
  "border-line-color": string
  "border-line-width": string
  "border-line-pattern": string
  "shape-class": string
  "line-class": string
  "arrow-end-class": string
}

export interface CalloutTopic {
  id: string
  properties: Properties4
}

export interface Properties4 {
  "fo:font-family": string
  "fo:font-size": string
  "fo:font-weight": string
  "fo:font-style": string
  "fo:color": string
  "fo:text-transform": string
  "fo:text-decoration": string
  "fo:text-align": string
  "svg:fill": string
  "fill-pattern": string
  "line-width": string
  "line-color": string
  "line-pattern": string
  "border-line-color": string
  "border-line-width": string
  "border-line-pattern": string
  "shape-class": string
  "arrow-end-class": string
}

export interface SummaryTopic {
  id: string
  properties: Properties5
}

export interface Properties5 {
  "fo:font-family": string
  "fo:font-size": string
  "fo:font-weight": string
  "fo:font-style": string
  "fo:color": string
  "fo:text-transform": string
  "fo:text-decoration": string
  "fo:text-align": string
  "svg:fill": string
  "fill-pattern": string
  "line-width": string
  "line-color": string
  "line-pattern": string
  "border-line-color": string
  "border-line-width": string
  "border-line-pattern": string
  "shape-class": string
  "line-class": string
  "arrow-end-class": string
}

export interface FloatingTopic {
  id: string
  properties: Properties6
}

export interface Properties6 {
  "fo:font-family": string
  "fo:font-size": string
  "fo:font-weight": string
  "fo:font-style": string
  "fo:color": string
  "fo:text-transform": string
  "fo:text-decoration": string
  "fo:text-align": string
  "svg:fill": string
  "fill-pattern": string
  "line-width": string
  "line-color": string
  "line-pattern": string
  "border-line-color": string
  "border-line-width": string
  "border-line-pattern": string
  "shape-class": string
  "line-class": string
  "arrow-end-class": string
}

export interface ImportantTopic {
  id: string
  properties: Properties7
}

export interface Properties7 {
  "svg:fill": string
  "fill-pattern": string
  "border-line-color": string
}

export interface MinorTopic {
  id: string
  properties: Properties8
}

export interface Properties8 {
  "svg:fill": string
  "fill-pattern": string
  "border-line-color": string
}

export interface ExpiredTopic {
  id: string
  properties: Properties9
}

export interface Properties9 {
  "fo:text-decoration": string
  "fill-pattern": string
}

export interface Boundary {
  id: string
  properties: Properties10
}

export interface Properties10 {
  "fo:font-family": string
  "fo:font-size": string
  "fo:font-weight": string
  "fo:font-style": string
  "fo:color": string
  "fo:text-transform": string
  "fo:text-decoration": string
  "fo:text-align": string
  "svg:fill": string
  "fill-pattern": string
  "line-width": string
  "line-color": string
  "line-pattern": string
  "shape-class": string
}

export interface Summary {
  id: string
  properties: Properties11
}

export interface Properties11 {
  "line-width": string
  "line-color": string
  "line-pattern": string
  "shape-class": string
}

export interface Relationship2 {
  id: string
  properties: Properties12
}

export interface Properties12 {
  "fo:font-family": string
  "fo:font-size": string
  "fo:font-weight": string
  "fo:font-style": string
  "fo:color": string
  "fo:text-transform": string
  "fo:text-decoration": string
  "fo:text-align": string
  "line-width": string
  "line-color": string
  "line-pattern": string
  "shape-class": string
  "arrow-begin-class": string
  "arrow-end-class": string
}

export interface Map {
  id: string
  properties: Properties13
}

export interface Properties13 {
  "svg:fill": string
  "multi-line-colors": string
  "color-list": string
  "line-tapered": string
}
