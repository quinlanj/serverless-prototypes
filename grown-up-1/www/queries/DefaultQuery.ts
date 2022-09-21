import { AbstractQuery } from "../../libraries/api/Placeholders";
import { ViewerContext } from "../../libraries/entity/Placeholders";
import NodeEntity from "../entities/default/NodeEntity";
import resolve from "../resolvers";

export class DefaultQuery extends AbstractQuery {
  constructor(nodeName: string) {
    super();
    this.nodeName = nodeName;
  }

  async where(args: {[field: string]: string}, viewerContext: ViewerContext): Promise<Node[]> {
    const result =  await NodeEntity.loader(viewerContext).loadByEqualityConjunctionAsync({...args, nodeType: this.nodeName});
    return resolve(viewerContext, this.nodeName, result, []);
  }
}