// Placeholder, nothing to see here
export class EntityFieldDefinition<T> {
  constructor(arg: any){

  }
}

export class ViewerContext {}

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

export class EntityPrivacyPolicy<A,B,C,D> {
  protected readonly readRules: any;
  protected readonly createRules: any;
  protected readonly updateRules: any;
  protected readonly deleteRules: any;
}

export class AlwaysAllowPrivacyPolicyRule<A,B,C,D> {
}
export class AllowIfUserOwnerPrivacyRule<A,B,C> {
  constructor(arg: any){

  }
}