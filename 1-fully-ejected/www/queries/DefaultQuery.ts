import { AbstractQuery } from "../../../libraries/api/Placeholders";
import { ViewerContext } from "../../../libraries/entity/Placeholders";
import NodeEntity from "../entities/default/NodeEntity";
import resolve from "../resolvers";

export class DefaultQuery extends AbstractQuery {
  constructor(nodeName: string) {
    super();
    this.nodeName = nodeName;
  }

  // Instaql Query: { nodeName : {}}
  async default(viewerContext: ViewerContext): Promise<Node[]> {
    const result = await NodeEntity.loader(viewerContext).loadManyByFieldEqualityConjunctionAsync({nodeType: this.nodeName});
    return resolve(viewerContext, this.nodeName, result, []);
  }

  // Instaql Query: { nodeName : { ${ where: { field: value } } } }
  async where(args: {[field: string]: string}, viewerContext: ViewerContext): Promise<Node[]> {
    const result =  await NodeEntity.loader(viewerContext).loadByEqualityConjunctionAsync({...args, nodeType: this.nodeName});
    return resolve(viewerContext, this.nodeName, result, []);
  }
}