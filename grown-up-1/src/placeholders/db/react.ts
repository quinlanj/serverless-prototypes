
import {
  useInit as useInitInstantDB,
  useQuery as useQueryInstantDB,
  transact as transactInstantDB,
  tx as txInstantDB,
  auth as authInstantDB,
} from "@instantdb/react";
import uuid from "uuid";

export const auth = authInstantDB;
export const tx = txInstantDB;
export type Op = [string, string, string, any];

export interface TransactionChunk {
  __ops: Op[];
  update: (args: {
      [attribute: string]: any;
  }) => TransactionChunk;
  link: (args: {
      [attribute: string]: string;
  }) => TransactionChunk;
  unlink: (args: {
      [attribute: string]: string;
  }) => TransactionChunk;
  delete: () => TransactionChunk;
}

export function useAdhocQuery(instaql: Object): Object {
  return useQueryInstantDB(instaql);
}

export function adhocTransact(x: TransactionChunk | TransactionChunk[]): void {
  return transactInstantDB(x);
}

export type InitState =
  | [isLoading: true, Error: undefined, auth: undefined]
  | [isLoading: false, Error: Error | undefined, auth: Object];

export function useInit(): InitState {
  return useInitInstantDB({
    appId: "7db55459-53ed-4836-81f9-e09de74e87c4",
    websocketURI: "wss://instant-server.herokuapp.com/api",
    apiURI: "https://instant-server.herokuapp.com/api",
  }) as InitState;
}

export function useGetGoals() {
  return useQueryInstantDB({ goals: { todos: {} } }) as any;
}

export type Todo = {
  id: string;
  data: Record<string, any>;
}

export function useAddTodos(todos: Todo[], goalId: string) {
  const todoCreation = todos.map((todo) => (txInstantDB.todos[todo.id].update(todo.data)
  ));
  const goalLinks = todos.map((todo) => (txInstantDB.goals[goalId].link({ name: "todos" })));
  return transactInstantDB([...todoCreation,...goalLinks]);
}

export function id(): string {
  return uuid.v4();
}