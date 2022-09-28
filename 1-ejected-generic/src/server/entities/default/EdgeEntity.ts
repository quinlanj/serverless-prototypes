import { StringField, UUIDField } from "../../../../../libraries/entity/EntityFields";
import { CacheAdapterFlavor, DatabaseAdapterFlavor, Entity, EntityCompanionDefinition, EntityConfiguration, ViewerContext } from "../../../../../libraries/entity/Placeholders";
import EdgePrivacyPolicy from "./EdgePrivacyPolicy";

export interface EdgeFields {
  src_node_id: string;
  dst_node_id: string;
  name: string;
}

export default class EdgeEntity extends Entity<EdgeFields, string, ViewerContext> {
  static getCompanionDefinition(): EntityCompanionDefinition<
    EdgeFields,
    string,
    ViewerContext,
    EdgeEntity,
    EdgePrivacyPolicy
  > {
    return EdgeCompanion;
  }
}

const EdgeCompanion = new EntityCompanionDefinition({
  entityClass: EdgeEntity,
  entityConfiguration: new EntityConfiguration<EdgeFields>({
    tableName: 'edges',
    schema: {
      src_node_id: new UUIDField({
        columnName: 'src_node_id',
      }),
      dst_node_id: new UUIDField({
        columnName: 'dst_node_id',
      }),
      name: new StringField({
        columnName: 'name',
      }),
    },
    databaseAdapterFlavor: DatabaseAdapterFlavor.SQLITE,
    cacheAdapterFlavor: CacheAdapterFlavor.REDIS,
  }),
  privacyPolicyClass: EdgePrivacyPolicy,
});
