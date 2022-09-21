import { AllowIfUserOwnerPrivacyRule, AlwaysAllowPrivacyPolicyRule, EntityPrivacyPolicy, ViewerContext } from "../../libraries/entity/Placeholders";
import GoalEntity, { GoalFields } from "./GoalEntity";

/**
 * For purposes of this demonstration, goals are considered public and can only be mutated by the owner.
 */
export default class GoalPrivacyPolicy extends EntityPrivacyPolicy<
  GoalFields,
  string,
  ViewerContext,
  GoalEntity
> {
  protected override readonly readRules = [
    new AlwaysAllowPrivacyPolicyRule<GoalFields, string, ViewerContext, GoalEntity>(),
  ];
  protected override readonly createRules = [
    new AllowIfUserOwnerPrivacyRule<GoalFields, string, GoalEntity>('user_id'),
  ];
  protected override readonly updateRules = [
    new AllowIfUserOwnerPrivacyRule<GoalFields, string, GoalEntity>('user_id'),
  ];
  protected override readonly deleteRules = [
    new AllowIfUserOwnerPrivacyRule<GoalFields, string, GoalEntity>('user_id'),
  ];
}
