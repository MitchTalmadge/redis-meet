export interface AbstractSocketMessage {
  event: string;
  data: any;
}

export type ClientSocketMessage = AbstractSocketMessage; // TODO
export type ServerSocketMessage = AbstractSocketMessage; // TODO
