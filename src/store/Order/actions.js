import moment from "moment";
import api from "@/asset/js/api";


export default {
    async list(context, data = {}) {
        try {
            data.lookup = [{
                from: "Client",
                localField: "Client",
                foreignField: "_id",
                as: "Client_as"
            }];
            const success = await api({
                url: "/h3/models/Order/find",
                data,
            });
            const { objects } = success;
            if (!(objects instanceof Array)) throw "没有从服务器中接收到有效信息";

            /** 数据筛选器 用的 */
            const dataFilter = {
                at_crt_format: [],
                at_pay_format: [],
            }
            const temp = {
                at_crt_format: [],
                at_pay_format: [],
                at_freight_format: [],
                at_finish_format: [],
            }
            objects.forEach(object => {
                /** at_crt => at_crt_format: String */
                if (object.at_crt) {
                    object.at_crt_format = moment(object.at_crt).format("YYYY-MM-DD");
                    if (!temp.at_crt_format.includes(object.at_crt_format)) {
                        temp.at_crt_format.push(object.at_crt_format);
                        dataFilter.at_crt_format.push({ text: object.at_crt_format, value: object.at_crt_format });
                    }
                }

                /** at_pay => at_pay_format: String */
                if (object.at_pay) {
                    object.at_pay_format = moment(object.at_pay).format("YYYY-MM-DD");
                    if (!temp.at_pay_format.includes(object.at_pay_format)) {
                        temp.at_pay_format.push(object.at_pay_format);
                        dataFilter.at_pay_format.push({ text: object.at_pay_format, value: object.at_pay_format });
                    }
                }
                /** at_freight => at_freight_format: String */
                if (object.at_freight) {
                    object.at_freight_format = moment(object.at_freight).format("YYYY-MM-DD");
                    if (!temp.at_freight_format.includes(object.at_freight_format)) {
                        temp.at_freight_format.push(object.at_freight_format);
                        dataFilter.at_freight_format.push({ text: object.at_freight_format, value: object.at_freight_format });
                    }
                }
                /** at_finish => at_finish_format: String */
                if (object.at_finish) {
                    object.at_finish_format = moment(object.at_finish).format("YYYY-MM-DD");
                    if (!temp.at_finish_format.includes(object.at_finish_format)) {
                        temp.at_finish_format.push(object.at_finish_format);
                        dataFilter.at_finish_format.push({ text: object.at_finish_format, value: object.at_finish_format });
                    }
                }

                if(object.step === 1) {
                    object.desc_step = "未支付";
                } else if(object.step === 5) {
                    object.desc_step = "准备中"
                } else if(object.step === 10) {
                    object.desc_step = "已完成"
                } else {
                    object.desc_step = "其他"
                }
            })

            context.commit('MT_list', { objects, dataFilter });

        } catch (e) {
            console.log(e);
            throw e;
        }
    },


    async update(context, {_id, step}) {
        const data = {
            filter: {_id},
            update: {step}
        }
        await api({
            url: "/h3/models/Order/updateOne",
            data,
        });
        context.commit('MT_update', {_id, step});
    },

    async deleteMany(context, ids) {

        const data = { filter: { includes: { _id: ids } } }
        const success = await api({
            url: "/h3/models/Order/deleteMany",
            data,
        });
        if (success.deletedResult.deletedCount === 0) {
            alert("删除失败")
        }
        context.commit('MT_remove', ids);
    },
    async deleteOne(context, _id) {
        const data = { filter: { _id } };
        const success = await api({
            url: "/h3/models/Order/deleteOne",
            data,
        });
        if (success.deletedResult.deletedCount === 0) {
            alert("删除失败")
        }
        context.commit('MT_remove', [_id]);
    }

}