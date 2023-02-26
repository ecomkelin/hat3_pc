import actions from "./actions";

export default {
    namespaced: true,
    actions,
    mutations: {
        MT_list(state, objects) {
            state.objects = objects;
        },

        MT_add(state, object) {
            if(object.level === 1) {
                state.objects.unshift(object);
            } else if(object.level === 2) {
                for (let index = 0; index < state.objects.length; index++) {
                    if (String(state.objects[index]._id) === String(object.Cateb_parent)) {
                        state.objects.unshift(object);
                        break;
                    }
                }
            }
        },

        MT_update(state, objects) {
            for (let i in objects) {
                const object = objects[i];
                let index = 0;
                for (; index < state.objects.length; index++) {
                    if (String(state.objects[index]._id) === String(object._id)) break;
                }
                if (index < state.objects.length) {
                    // if(state.object && (String(state.object._id) === String(object._id))) state.object = object;
                    state.objects.splice(index, 1, object);
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
                    if (state.object && (String(state.object._id) === String(_id))) state.object = null;
                    state.objects.splice(index, 1);
                }
            }
        },

        MT_selectOne(state, id) {
            for (let i in state.objects) {
                const object = state.objects[i];
                if (String(object._id) === String(id)) {
                    state.object = object;
                    return
                }
            }
            state.object = null;
        },
        MT_clearOne(state) {
            state.object = null;
        }
    },
    state: {
        objects: [],
        object: null,
    }
}