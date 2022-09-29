import { AbstractResolver } from "../../../../libraries/api/Placeholders";
import { ViewerContext } from "../../../../libraries/entity/Placeholders";
import EdgeEntity from "../entities/default/EdgeEntity";
import NodeEntity from "../entities/default/NodeEntity";

export class DefaultResolver extends AbstractResolver {
  static async resolveAsync(viewerContext: ViewerContext, node: NodeEntity, explicitEdges: string[]): Promise<Node> {
    return {
      ... node.getAllFields(),
      ... (await this.resolveEdgesAsync(viewerContext, node, explicitEdges)),
    };
  }
  
  static async resolveEdgesAsync(viewerContext: ViewerContext, node: NodeEntity, explicitEdges: string[]): Promise<Record<string, NodeEntity>> {
    const edgeMap = {} as Record<string, NodeEntity>;
    for (let edge of explicitEdges) {
      const dstNodeIds = await EdgeEntity.loader(viewerContext).loadManyByFieldEqualityConjunctionAsync({'src_node_id': node.getID(), 'name': edge});
      const edgeNodes = await NodeEntity.loader(viewerContext).loadManyAsync(dstNodeIds);
      edgeMap[edge] = edgeNodes;
    }
    return edgeMap;
  }
}