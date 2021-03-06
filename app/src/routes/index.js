// We only need to import the modules necessary for initial render
import CoreLayout from "../layouts/CoreLayout";
import Home from "./Home";
import { LoginRoute, LogoutRoute, RegisterRoute, RemindRoute, ResetRoute, ChangeRoute  } from "./Auth";
import EventsRoute from "./Events";
import TournamentRoute from "./Tournaments";
import { GamesRoute, GameDetailsRoute } from "./Games/index";
import { EditRoute, ProfileRoute } from "./User";
import achievementsRoute from "./Archievments";

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = store => ({
    path: "/",
    component: CoreLayout,
    indexRoute: Home,
    childRoutes: [
        LoginRoute(store),
        LogoutRoute(store),
        RegisterRoute(store),
        RemindRoute(store),
        EventsRoute(store),
        GamesRoute(store),
        TournamentRoute(store),
        achievementsRoute(store),
        GameDetailsRoute(store),
        EditRoute(store),
        ProfileRoute(store),
        ResetRoute(store),
        ChangeRoute(store)
    ]
});

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes;
