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
    limit: 100,
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
        MT_CatefsSet(state, Catef_id) {
            state.filter.includes.Catefs = Catef_id;
        },
        MT_CatefsUnset(state) {
            delete state.filter.includes.Catefs
        },
        MT_pageSet(state, page=1) {
            try {
                if(isNaN(page) || page<1) throw "page 传递错误";
                state.skip = (page - 1) * state.limit;
            } catch(e) {
                console.error("Reqest MT_pageSet Error: ", e);
            }
        },
        MT_reset(state) {
            for(let key in initState) {
                state[key] = initState[key]
            }
        }
    },
    state: initState
}