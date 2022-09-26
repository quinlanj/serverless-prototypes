import { Context, ViewerContext } from "../../../libraries/entity/Placeholders";
import { decodeJWT } from "../../../libraries/placeholders/utils";


/**
 * Assigns a ViewerContext for every request. The two options in order of precedence are:
 *    UserViewerContext (from session token)
 *    AnonymousViewerContext (when neither of the other methods resolves)
 */
 export function getViewerContext(ctx: Context): ViewerContext {
  return {
    userID: decodeJWT(ctx.req.cookies.get('session')),
  }
 }