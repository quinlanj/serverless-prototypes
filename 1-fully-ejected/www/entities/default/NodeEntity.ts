import { JSONObjectField, StringField, UUIDField } from "../../../../libraries/entity/EntityFields";
import { CacheAdapterFlavor, DatabaseAdapterFlavor, Entity, EntityCompanionDefinition, EntityConfiguration, ViewerContext } from "../../../../libraries/entity/Placeholders";
import NodePrivacyPolicy from "./NodePrivacyPolicy";

export interface NodeFields {
  id: string;
  data: JSON;
  node_type: string;
}

export default class NodeEntity extends Entity<NodeFields, string, ViewerContext> {
  static getCompanionDefinition(): EntityCompanionDefinition<
    NodeFields,
    string,
    ViewerContext,
    NodeEntity,
    NodePrivacyPolicy
  > {
    return NodeCompanion;
  }
}

const NodeCompanion = new EntityCompanionDefinition({
  entityClass: NodeEntity,
  entityConfiguration: new EntityConfiguration<NodeFields>({
    tableName: 'nodes',
    schema: {
      id: new UUIDField({
        columnName: 'id',
      }),
      data: new JSONObjectField({
        columnName: 'field_name',
      }),
      node_type: new StringField({
        columnName: 'node_type',
      }),
    },
    databaseAdapterFlavor: DatabaseAdapterFlavor.SQLITE,
    cacheAdapterFlavor: CacheAdapterFlavor.REDIS,
  }),
  privacyPolicyClass: NodePrivacyPolicy,
});
