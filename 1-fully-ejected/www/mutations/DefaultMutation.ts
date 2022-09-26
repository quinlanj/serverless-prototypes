import { AbstractMutation } from "../../../libraries/api/Placeholders";
import { ViewerContext } from "../../../libraries/entity/Placeholders";
import EdgeEntity from "../entities/default/EdgeEntity";
import NodeEntity from "../entities/default/NodeEntity";

export class DefaultMutation extends AbstractMutation {
  constructor(nodeName: string) {
    super();
    this.nodeName = nodeName;
  }

  async update(args: {[field: string]: string}, viewerContext: ViewerContext): Promise<void> {
    const nodeId = args['id'];
    const node = await NodeEntity.loader(viewerContext).loadByIDAsync(nodeId);
    await NodeEntity.updater(node).setFields(args).updateAsync();
  }

  async link({srcNodeId, dstNodeId, name}: {[field: string]: string}, viewerContext: ViewerContext): Promise<Node[]> {
    // TODO: upsert edge
    return await EdgeEntity.creator(viewerContext).setFields({src_node_id: srcNodeId, dst_node_id: dstNodeId, name});
  }

  async unlink({srcNodeId, dstNodeId, name}: {[field: string]: string}, viewerContext: ViewerContext): Promise<Node[]> {
    const edge = await EdgeEntity.loader(viewerContext).loadByEqualityConjunctionAsync({src_node_id: srcNodeId, dst_node_id: dstNodeId, name});
    return await EdgeEntity.deleter(edge).deleteAsync();
  }
}