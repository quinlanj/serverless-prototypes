import { DefaultQuery } from "./DefaultQuery";
import { GoalQuery } from "./GoalQuery";

export async function query(nodeName: string, query: string): Promise<Object | Object[]> {
  if (nodeName === 'goals') {
    return GoalQuery.queryAsync(query);
  } else {
    return DefaultQuery.queryAsync(query);
  }
}

