import { AbstractQuery } from "../../libraries/api/Placeholders";
import { ViewerContext } from "../../libraries/entity/Placeholders";
import GoalEntity from "../entities/GoalEntity";
import resolve from "../resolvers";
import { Goal } from "../resolvers/GoalResolver";

export class GoalQuery extends AbstractQuery {
  constructor() {
    super();
    this.nodeName = 'goals';
  }

  // Instaql Query: { goals : {}}
  async default(viewerContext: ViewerContext): Promise<Node[]> {
    const result = await GoalEntity.loader(viewerContext).loadManyByFieldEqualityConjunctionAsync({});
    return resolve(viewerContext, this.nodeName, result, []);
  }

  // Instaql Query: { goals : { ${ where: { field: value } } } }
  async where(args: {[field: string]: string}, viewerContext: ViewerContext): Promise<Goal[]> {
    const newArgs = {};
    for (const field in args) {
      if (field === 'oldField') {
        newArgs['newField'] = args[field];
      } else {
        newArgs[field] = args[field];
      }
    }
    const result = await GoalEntity.loader(viewerContext).loadByEqualityConjunctionAsync(newArgs);
    return resolve(viewerContext, this.nodeName, result, []);
  }
}