import { AlwaysAllowPrivacyPolicyRule, EntityPrivacyPolicy, ViewerContext } from "../../../libraries/entity/Placeholders";
import NodeEntity, { NodeFields } from "./NodeEntity";

export default class NodePrivacyPolicy extends EntityPrivacyPolicy<
  NodeFields,
  string,
  ViewerContext,
  NodeEntity
> {
  protected override readonly readRules = [
    new AlwaysAllowPrivacyPolicyRule<NodeFields, string, ViewerContext, NodeEntity>(),
  ];
  protected override readonly createRules = [
    new AlwaysAllowPrivacyPolicyRule<NodeFields, string, ViewerContext, NodeEntity>(),
  ];
  protected override readonly updateRules = [
    new AlwaysAllowPrivacyPolicyRule<NodeFields, string, ViewerContext, NodeEntity>(),
  ];
  protected override readonly deleteRules = [
    new AlwaysAllowPrivacyPolicyRule<NodeFields, string, ViewerContext, NodeEntity>(),
  ];
}
