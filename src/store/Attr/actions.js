import api from "@/asset/js/api";


export default {
    async list(context, data={}) {
        try {

            data.find = 1; // 直接查找 属性值

            const success = await api({
                url: "/h3/models/attk/find",
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
    async add( context, document = {} ) {
        const data = {document};
        const success = await api({
            url: "/h3/models/attk/insertOne",
            data,
        });
        context.commit('MT_add', success.document);
    },

    async update( context, data = {} ) {
        const success = await api({
            url: "/h3/models/attr/updateOne",
            data,
        });
        const {object} = success;
        context.commit('MT_update', [object]);
    },

    async deleteMany(context, ids) {
        const data = {filter: {includes: {_id: ids}}}
        const success = await api({
            url: "/h3/models/user/deleteMany",
            data,
        });
        if (success.deletedResult.deletedCount === 0) {
            alert("删除失败")
        }
        context.commit('MT_remove', ids);
    },
    async deleteOne(context, _id) {
        const data = {filter: {_id}};
        const success = await api({
            url: "/h3/models/user/deleteOne",
            data,
        });
        if (success.deletedResult.deletedCount === 0) {
            alert("删除失败")
        }
        context.commit('MT_remove', [_id]);
    }

}