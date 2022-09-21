import { AbstractQuery } from "../../libraries/api/Placeholders";
import { ViewerContext } from "../../libraries/entity/Placeholders";
import NodeEntity from "../entities/default/NodeEntity";

export class DefaultQuery extends AbstractQuery {
  constructor(nodeName: string) {
    super();
    this.nodeName = nodeName;
  }

  async where(args: {[field: string]: string}, viewerContext: ViewerContext): Promise<Node[]> {
    return await NodeEntity.loader(viewerContext).loadByEqualityConjunctionAsync({...args, nodeType: this.nodeName});
  }
}