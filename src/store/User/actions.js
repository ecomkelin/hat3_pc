import moment from "moment";
import api from "@/asset/js/api";

const roleMap = {
    10: "manager",
    20: "sfer",
    30: "pder",
    40: "designer",
    100: "Client"
}
export default {
    async list(context, data) {
        try {
            const success = await api({
                url: "/h3/models/User/find",
                data,
            });
            const { objects } = success;
            if (!(objects instanceof Array)) throw "没有从服务器中接收到有效信息";
            // await localforage.setItem("Users", objects);

            const check = {
                at_crt_format: []
            }
            const dataFilter = {
                at_crt_format: []
            }
            objects.forEach(object => {
                /** at_crt */
                object.at_crt_format = moment(object.at_crt).format("YYYY-MM-DD");
                if (!check.at_crt_format.includes(object.at_crt_format)) {
                    check.at_crt_format.push(object.at_crt_format);
                    dataFilter.at_crt_format.push({ text: object.at_crt_format, value: object.at_crt_format });
                }
                /** role */
                object._role = roleMap[object.role]

                /** is_usable */
                object.is_usable_format = object.is_usable ? "在用" : "禁用";
            })
            context.commit('MT_list', { objects, dataFilter });
        } catch (e) {
            console.error(e);
            throw e;
        }
    },
    async add( context, document = {} ) {
        const data = {document};
        const success = await api({
            url: "/h3/models/User/insertOne",
            data,
        });
        context.commit('MT_add', success.document);
    },
    async update( context, data = {} ) {
        const success = await api({
            url: "/h3/models/User/updateOne",
            data,
        });
        const {object} = success;
        context.commit('MT_update', [object]);
    },
    async updateMany( context, {ids, update} ) {

        const data = {filter: {includes: {_id: ids}}, update};
        const success = await api({
            url: "/h3/models/User/updateMany",
            data,
        });
        console.log("占位", context, success)
    },
    async deleteMany(context, ids) {

        const data = {filter: {includes: {_id: ids}}}
        const success = await api({
            url: "/h3/models/User/deleteMany",
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
            url: "/h3/models/User/deleteOne",
            data,
        });
        if (success.deletedResult.deletedCount === 0) {
            alert("删除失败")
        }
        context.commit('MT_remove', [_id]);
    }

}