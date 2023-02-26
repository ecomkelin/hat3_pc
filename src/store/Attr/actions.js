import api from "@/asset/js/api";


export default {
    async list(context, data={}) {
        try {
            data.find = 1;
            data.sort = {sort: -1}
            const success = await api({
                url: "/h3/models/Attk/find",
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
        let url = "/h3/models/Attv/insertOne";
        const {Attk} = document;
        /** 如果有 Attk 字段说明是添加 Attv */
        if(!Attk) {
            delete document.Attk;
            url = "/h3/models/Attk/insertOne";
        }

        const data = {document};

        const success = await api({ url, data });

        context.commit('MT_add', success.document);
    },

    async update( context, data = {} ) {
        let url;
        if(data.Attk) {
            delete data.Attk;
            url = "/h3/models/Attk/updateOne";
        } else {
            url = "/h3/models/Attv/updateOne";
        }
        const success = await api({ url, data, });
        const {object} = success;
        context.commit('MT_update', [object]);
    },

    async deleteOne(context, filter={}) {
        try {
            let url ="/h3/models/Attv/deleteOne";
            const {is_Attk, _id} = filter;
            if(!_id) return alert("请传递 _id");
    
            if(is_Attk) {
                delete filter.is_Attk;
                url = "/h3/models/Attk/deleteOne"
            }
            const data = {filter};
            const success = await api({ url, data});
            if (success.deletedResult.deletedCount === 0) {
                alert("删除失败")
            }
            context.commit('MT_remove', [_id]);
        } catch(e) {
            alert(e);
        }
    }

}