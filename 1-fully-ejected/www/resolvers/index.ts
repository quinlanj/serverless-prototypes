import { Entity, ViewerContext } from "../../libraries/entity/Placeholders";
import { DefaultResolver } from "./DefaultResolver";
import { GoalResolver } from "./GoalResolver";

export default async function resolve(viewerContext: ViewerContext, nodeName: string, entity: Entity<any, any, any>, explicitEdgesAndFields: string[]): Promise<any> {
  if (nodeName === 'goals') {
    return await GoalResolver.resolveAsync(viewerContext, entity, explicitEdgesAndFields); 
  } else {
    return await DefaultResolver.resolveAsync(viewerContext, entity, explicitEdgesAndFields);
  }
}
