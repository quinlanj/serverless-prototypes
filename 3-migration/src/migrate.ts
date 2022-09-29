import { ConflictPolicy, ViewerContext } from "../../libraries/entity/Placeholders";
import { AbstractMigration } from "../../libraries/placeholders/migrations";
import EdgeEntity from "./entities/default/EdgeEntity";
import NodeEntity from "./entities/default/NodeEntity";
import GoalEntity from "./entities/GoalEntity";

export class Migration extends AbstractMigration {
  constructor(
    public readonly nodeName: string,
  ) {
    super(nodeName);
  }

  async migrateAsync(viewerContext: ViewerContext, goal: NodeEntity, edgesByName: {[name: string]: EdgeEntity[]}): Promise<void> {
    const { description } = goal.getData();
    const userEdge = edgesByName['user'][0];
    const user_id = userEdge.getDestinationNodeID();
    await GoalEntity.creator(viewerContext)
      .setField('id', goal.getID())
      .setField('description', description)
      .setField('user_id', user_id)
      .onConflict(ConflictPolicy.DO_NOTHING);
  }
}