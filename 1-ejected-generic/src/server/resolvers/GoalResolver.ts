import { AbstractResolver } from "../../../../libraries/api/Placeholders";
import { ViewerContext } from "../../../../libraries/entity/Placeholders";
import GoalEntity from "../entities/GoalEntity";
import { TodoEntity, UserEntity } from "../placeholders/entities";
import { Resolver, Todo, User } from "../placeholders/resolvers";
import { makeNetworkRequestAsync, resolveAllFields, resolveSelectedFields } from "../placeholders/utils";

export type Goal = ImplicitGoalFields & ExplicitGoalFields;
type ImplicitGoalFields = {
  id: string,
  description: string,
  oldField: string,
  newField: string,
};
type ExplicitGoalFields = {
  todos: Todo[],
  user: User,
  slowFetchField: string,
}

export class GoalResolver extends AbstractResolver {
  static async resolveAsync(viewerContext: ViewerContext, goal: GoalEntity, explicitEdgesAndFields: string[]): Promise<Goal> {
    return {
      ... resolveAllFields(goal, this.implicitResolver),
      ... resolveSelectedFields(goal, this.explicitResolver, explicitEdgesAndFields),
    };
  }
  
  static implicitResolver(): Resolver {
    return {
      id: (goal: GoalEntity) => goal.getID(),
      description: (goal: GoalEntity) => goal.getField('description'),
      oldFieldThatNoLongerExists: (goal: GoalEntity) => goal.getField('newField'),
      newField: (goal: GoalEntity) => goal.getField('newField')
    }
  }
  
  static explicitResolver(viewerContext: ViewerContext): Resolver {
    return {
      todos: async (goal: GoalEntity) => TodoEntity.loader(viewerContext).loadManyAsync('goal_id', goal.getID()),
      user: async (goal: GoalEntity) => UserEntity.loader(viewerContext).loadIDAsync(goal.getField('user_id')),
      slowFetchField: async (goal: GoalEntity) => {
        await makeNetworkRequestAsync();
        return goal.getField('slowFetchField');
      },
    }
  }
}

