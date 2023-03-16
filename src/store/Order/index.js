import actions from "./actions";

export default {
    namespaced: true,
    actions,
    mutations: {
        MT_list(state, { objects, dataFilter }) {
            state.objects = objects;
            state.dataFilter = dataFilter || [];
        },
        MT_update(state, { _id, step }) {
            for (let i in state.objects) {
                if (String(state.objects[i]._id) === _id) {
                    state.objects[i].step = step;
                }
            }
        },


        MT_remove(state, ids) {
            for (let i in ids) {
                const _id = ids[i];

                let index = 0;
                for (; index < state.objects.length; index++) {
                    if (String(state.objects[index]._id) === String(_id)) break;
                }
                if (index < state.objects.length) {
                    state.objects.splice(index, 1);
                }
            }
        }
    },
    state: {
        objects: [],
        dataFilter: []
    }
}