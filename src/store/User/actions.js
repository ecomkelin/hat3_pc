import api from "@/asset/js/api";

import moment from "moment";

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
                url: "/h3/models/user/find",
                data,
            });
            const { objects } = success;
            if (!(objects instanceof Array)) throw "没有从服务器中接收到有效信息";
            // await localforage.setItem("Users", objects);

            const check = {
                format_crt: []
            }
            const dataFilter = {
                format_crt: []
            }
            objects.forEach(object => {
                /** at_crt */
                object.format_crt = moment(object.at_crt).format("YYYY-MM-DD");
                if (!check.format_crt.includes(object.format_crt)) {
                    check.format_crt.push(object.format_crt);
                    dataFilter.format_crt.push({ text: object.format_crt, value: object.format_crt });
                }
                /** role */
                object._role = roleMap[object.role]

                /** is_usable */
                object.usable = object.is_usable ? "在用" : "禁用";
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
            url: "/h3/models/user/insertOne",
            data,
        });
        context.commit('MT_add', success.document);
    },
    async update( context, data = {} ) {
        const success = await api({
            url: "/h3/models/user/updateOne",
            data,
        });
        const {object} = success;
        context.commit('MT_update', [object]);
    },
    async updateMany( context, {ids, update} ) {

        const data = {filter: {includes: {_id: ids}}, update};
        const success = await api({
            url: "/h3/models/user/updateMany",
            data,
        });
        console.log("占位", context, success)
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