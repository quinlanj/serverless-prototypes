import PrivacyPolicyRule, { RuleEvaluationResult, SchemalessEntity, ViewerContext } from "../../../../libraries/entity/Placeholders";

/**
 * Example privacy rule that makes use of the types of ViewerContexts specific
 * to this application.
 *
 * For simplicity, all privacy rules should generally be of the form
 * - AllowIfConditionPrivacy rule - allows when condition holds, otherwise skips
 * - DenyIfConditionPrivacy rule - denies when condition holds, otherwise skips
 *
 * If all rules skip, the privacy policy itself denies access.
 *
 * This particular rule checks the owner field of the entity being authorized
 * and compares it to the current viewer's user ID. If they're the same, it allows.
 * Otherwise, it defers to the next rule in the policy.
 */
export default class AllowIfUserOwnerPrivacyRule extends PrivacyPolicyRule {
  constructor(private readonly entityOwnerField: string) {
    super();
  }

  async evaluateAsync(
    viewerContext: ViewerContext,
    entity: SchemalessEntity
  ): Promise<RuleEvaluationResult> {
    if (entity.getField(this.entityOwnerField) === viewerContext.userID) {
      return RuleEvaluationResult.ALLOW;
    }
    return RuleEvaluationResult.SKIP;
  }
}
