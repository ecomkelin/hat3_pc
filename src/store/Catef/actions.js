import api from "@/asset/js/api";


export default {
    async list(context, data={}) {
        try {
            data.sort = {sort: -1}
            const success = await api({
                url: "/h3/models/Catef/find",
                data,
            });
            const { objects } = success;
            if (!(objects instanceof Array)) throw "没有从服务器中接收到有效信息";
            // await localforage.setItem("Users", objects);
            context.commit('MT_list', objects);
        } catch (e) {
            console.log(e);
            throw e;
        }
    },
    
    async add( context, data = {} ) {
        const success = await api({
            url: "/h3/models/Catef/insertOne",
            data,
            is_formDate: data.document ? false : true
        });
        context.commit('MT_add', success.document);
    },

    async update( context, data = {} ) {
        const success = await api({
            url: "/h3/models/Catef/updateOne",
            data,
            is_formDate: data.update ? false : true
        });
        const {object} = success;
        context.commit('MT_update', [object]);
    },

    async deleteOne(context, _id) {
        const data = {filter: {_id}};
        const success = await api({
            url: "/h3/models/Catef/deleteOne",
            data,
        });
        if (success.deletedResult.deletedCount === 0) {
            alert("删除失败")
        }
        context.commit('MT_remove', [_id]);
    },
}