// Placeholder, nothing to see here
export class EntityFieldDefinition<T> {
  constructor(arg: any){

  }
}

export type ViewerContext = any;

export type Context = any;

export class Entity<A,B,C> {
  static loader(viewerContext: ViewerContext): any {
  }
  public getField(fieldName: string): any {
  }
  public getID(): any {
  }
  public getAllFields(): any {}

  static creator(viewerContext: ViewerContext): any {}

  static deleter(viewerContext: ViewerContext): any {}

  static updater(viewerContext: ViewerContext): any {}
}


export class SchemalessEntity extends Entity<any,any,any> {

}

export enum DatabaseAdapterFlavor {
  SQLITE = 'sqlite',
}

export enum CacheAdapterFlavor {
  REDIS = 'redis',
}

export class EntityCompanionDefinition<A,B,C,D,E> {
  constructor(arg: any){

  }
}

export class EntityConfiguration<T> {
  constructor(arg: any){

  }
}

export class EntityPrivacyPolicy {
  static readonly nodeName: any;
  protected readonly readRules: any;
  protected readonly createRules: any;
  protected readonly updateRules: any;
  protected readonly deleteRules: any;
}

export class SchemalessEntityPrivacyPolicy extends EntityPrivacyPolicy {
}

export class AlwaysAllowPrivacyPolicyRule<A,B,C,D> {
}
export class AllowIfUserOwnerPrivacyRule<A,B,C> {
  constructor(arg: any){

  }
}

export enum RuleEvaluationResult {
  /**
   * Deny viewer access to the entity.
   */
  DENY = -1,

  /**
   * Defer entity viewer access to subsequent rule in the privacy policy.
   */
  SKIP = 0,

  /**
   * Allow viewer access to the entity.
   */
  ALLOW = 1,
}

export default abstract class PrivacyPolicyRule {
  abstract evaluateAsync(
    arg1: any,
    arg2: any
  ): Promise<RuleEvaluationResult>;
}