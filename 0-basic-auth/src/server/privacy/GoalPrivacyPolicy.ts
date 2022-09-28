import { AllowIfUserOwnerPrivacyRule, AlwaysAllowPrivacyPolicyRule, EntityPrivacyPolicy, SchemalessEntityPrivacyPolicy, ViewerContext } from "../../../../libraries/entity/Placeholders";

/**
 * For purposes of this demonstration, goals are considered public and can only be mutated by the owner.
 */
export default class GoalPrivacyPolicy extends SchemalessEntityPrivacyPolicy {
  static nodeName = 'goals';
  protected override readonly readRules = [
    new AlwaysAllowPrivacyPolicyRule(),
  ];
  protected override readonly createRules = [
    new AllowIfUserOwnerPrivacyRule('user_id'),
  ];
  protected override readonly updateRules = [
    new AllowIfUserOwnerPrivacyRule('user_id'),
  ];
  protected override readonly deleteRules = [
    new AllowIfUserOwnerPrivacyRule('user_id'),
  ];
}
