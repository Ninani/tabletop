import { injectReducer } from "../../store/reducers";

export default store => ({
    path: "/events",
    indexRoute: {
        getComponent(nextState, cb) {
            require.ensure([], (require) => {
                const EventsView = require("./Index/components/EventsView.jsx").default;
                const { locationReducer, typeReducer, gamesReducer, dateReducer } = require("./Index/modules/FilterReducers");
                const { eventsReducer } = require("./Index/modules/EventReducers");
                injectReducer(store, { key: "locationFilter", reducer: locationReducer });
                injectReducer(store, { key: "typeFilter", reducer: typeReducer });
                injectReducer(store, { key: "gamesFilter", reducer: gamesReducer });
                injectReducer(store, { key: "dateFilter", reducer: dateReducer });
                injectReducer(store, { key: "events", reducer: eventsReducer });
                cb(null, EventsView);
            }, "events");
        }
    }
});
