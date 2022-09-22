
import {
  useInit as useInitInstantDB,
  useQuery as useQueryInstantDB,
  transact as transactInstantDB,
  tx as txInstantDB,
  auth as authInstantDB,
  id as idInstantDB,
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

type QueryResult = {status: any, data: any, error: any, isFetching: boolean};

export function useQuery(instaql: Object): QueryResult {
  return {status: 'ok', data: useQueryInstantDB(instaql), error: null, isFetching: false};
}

type UseMutationFunction = {
  mutate: (args: any) => any;
}

export function useTransactionMutation(): UseMutationFunction {
  return {
    mutate: (x: TransactionChunk | TransactionChunk[]) => transactInstantDB(x),
  }
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

export function id(): string {
  return idInstantDB();
}