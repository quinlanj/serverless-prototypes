import { DefaultMutation } from "./DefaultMutation";


export async function mutateAsync(nodeName: string, mutation: string): Promise<Object | Object[]> {
  return DefaultMutation.mutateAsync(mutation);
}

