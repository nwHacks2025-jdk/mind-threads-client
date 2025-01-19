export interface Node {
  id: string;
  label: string;
  val: number;
  count: number;
}

export interface Link {
  source: string;
  target: string;
}
