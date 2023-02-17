import actions from "./actions";

export default {
    namespaced: true,
    actions,
    mutations: {
        MT_list(state, objects) {
            state.objects = objects;
        },
        MT_add(state, object) {
            state.objects.unshift(object);
        },
        MT_update(state, objects) {
            for(let i in objects) {
                const object = objects[i];
                let index = 0;
                for(; index<state.objects.length; index++) {
                    if(String(state.objects[index]._id) === String(object._id)) break;
                }
                if(index < state.objects.length) {
                    state.objects.splice(index, 1, object);
                }
            }
        },
        MT_remove(state, ids) {
            for(let i in ids) {
                const _id = ids[i];
                
                let index = 0;
                for(; index<state.objects.length; index++) {
                    if(String(state.objects[index]._id) === String(_id)) break;
                }
                if(index < state.objects.length) {
                    state.objects.splice(index, 1);
                }
            }
        }
    },
    state: {
        objects: []
    }
}