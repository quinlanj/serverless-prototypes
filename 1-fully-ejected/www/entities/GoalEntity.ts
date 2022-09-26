import { DateField, StringField, UUIDField } from "../../../libraries/entity/EntityFields";
import { CacheAdapterFlavor, DatabaseAdapterFlavor, Entity, EntityCompanionDefinition, EntityConfiguration, ViewerContext } from "../../../libraries/entity/Placeholders";
import GoalPrivacyPolicy from "./GoalPrivacyPolicy";

export interface GoalFields {
  id: string;
  description: string;
  new_field: string;
  user_id: string;
  created_at: Date;
  updated_at: Date;
}

export default class GoalEntity extends Entity<GoalFields, string, ViewerContext> {
  static getCompanionDefinition(): EntityCompanionDefinition<
    GoalFields,
    string,
    ViewerContext,
    GoalEntity,
    GoalPrivacyPolicy
  > {
    return GoalCompanion;
  }
}

const GoalCompanion = new EntityCompanionDefinition({
  entityClass: GoalEntity,
  entityConfiguration: new EntityConfiguration<GoalFields>({
    idField: 'id',
    tableName: 'goals',
    schema: {
      id: new UUIDField({
        columnName: 'id',
      }),
      description: new StringField({
        columnName: 'description',
      }),
      user_id: new UUIDField({
        columnName: 'user_id',
      }),
      created_at: new DateField({
        columnName: 'created_at',
      }),
      updated_at: new DateField({
        columnName: 'updated_at',
      }),
    },
    databaseAdapterFlavor: DatabaseAdapterFlavor.SQLITE,
    cacheAdapterFlavor: CacheAdapterFlavor.REDIS,
  }),
  privacyPolicyClass: GoalPrivacyPolicy,
});
