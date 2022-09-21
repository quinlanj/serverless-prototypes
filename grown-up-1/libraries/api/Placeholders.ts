export class AbstractQuery {
  protected nodeName: string;

  static async queryAsync(query: string): Promise<Object | Object[]> {
    return [];
  }
}

export class AbstractMutation {
  protected nodeName: string;

  static async mutateAsync(mutation: string): Promise<Object | Object[]> {
    return [];
  }
}

export class AbstractResolver {
}