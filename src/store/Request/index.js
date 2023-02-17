const initState = {
    filter: {
        search: {},
        exact: { },
        includes: {},
        // excludes: {},
        lte: {},
        gte: {},
        at_before: {},
        at_after: {}
    },
    skip: 0,
    limit: 50,
    sort: {}
}

export default {
    namespaced: true,
    actions: {},
    mutations: {
        MT_filterSet(state, filter) {
            state.filter = filter;
        },
        MT_sortSet(state, sort) {
            state.sort = sort;
        },
        MT_reset(state) {
            for(let key in initState) {
                state[key] = initState[key]
            }
        }
    },
    state: initState
}