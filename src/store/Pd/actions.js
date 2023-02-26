import moment from "moment";
import api from "@/asset/js/api";


export default {
    async list(context, data = {}) {
        try {
            data = { ...data };
            data.lookup = [{
                from: "Cateb",
                localField: "Cateb",
                foreignField: "_id",
                pipeline: [{
                    "$lookup": {
                        from: "Cateb",
                        localField: "Cateb_parent",
                        foreignField: "_id",
                        as: "Cateb_parent_as"
                    }
                }],
                as: "Cateb_as"
            },{
                from: "Catef",
                localField: "Catefs",
                foreignField: "_id",
                as: "Catefs_as"
            }, {
                from: "Sku",
                localField: "Skus",
                foreignField: "_id",
                as: "Skus_as"
            }];
            const success = await api({
                url: "/h3/models/Pd/find",
                data,
            });
            const { objects } = success;
            if (!(objects instanceof Array)) throw "没有从服务器中接收到有效信息";
            // console.log(" $$$$ ", objects)

            /** 获取 parse Attrs */
            // const Attrs = context.tate.Attr.objects;

            /** 数据筛选器 用的 */
            const dataFilter = {
                at_crt_format: [],
                at_upd_format: [],
            }
            const temp = {
                at_crt_format: [],
                at_upd_format: [],
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

                /** at_upd => at_upd_format: String */
                if (object.at_upd) {
                    object.at_upd_format = moment(object.at_upd).format("YYYY-MM-DD");
                    if (!temp.at_upd_format.includes(object.at_upd_format)) {
                        temp.at_upd_format.push(object.at_upd_format);
                        dataFilter.at_upd_format.push({ text: object.at_upd_format, value: object.at_upd_format });
                    }
                }
                /** Cateb => cateb: [] */
                object.Cateb_formats = []
                if (object.Cateb_as && object.Cateb_as[0] && object.Cateb_as[0].Cateb_parent_as) {
                    object.Cateb_formats.push({
                        label: object.Cateb_as[0].Cateb_parent_as[0].code,
                        value: object.Cateb_as[0].Cateb_parent_as[0]._id,
                    });
                    object.Cateb_formats.push({
                        label: object.Cateb_as[0].code,
                        value: object.Cateb_as[0]._id
                    })
                }

                /** desc_retail desc_sale */
                if (object.Skus_as instanceof Array) {
                    let max_retail = -10000, max_sale = -10000;
                    let min_retail = 1000000, min_sale = 1000000;
                    for (let i in object.Skus_as) {
                        const Sku = object.Skus_as[i];
                        const { price_retail, price_sale } = Sku;
                        if (price_retail > max_retail) max_retail = price_retail;
                        if (price_retail < min_retail) min_retail = price_retail;
                        if (price_sale > max_sale) max_sale = price_sale;
                        if (price_sale < min_sale) min_sale = price_sale;
                    }
                    if(max_retail === min_retail) {
                        object.desc_retail = max_retail.toFixed(2);
                    } else if(max_retail > min_retail) {
                        object.desc_retail = min_retail.toFixed(2) + " ～ " + max_retail.toFixed(2);
                    }
                    if(max_sale === min_sale) {
                        object.desc_sale = max_sale.toFixed(2);
                    } else if(max_sale > min_sale) {
                        object.desc_sale = min_sale.toFixed(2) + " ～ " + max_sale.toFixed(2);
                    }
                }

                // /** 根据 parse Attr 给 kvs_attrs 设定值 Attk/Attv 用ObjectId时 用的 */
                // if(object.kvs_attrs instanceof Array) {
                //     for(let i in object.kvs_attrs) {
                //         const kvs_attr = object.kvs_attrs[i];
                //         for(let m in Attrs) {
                //             const Attr = Attrs[m];
                //             if(Attr._id === kvs_attr.Attk) {
                //                 object.kvs_attrs[i].Attk_as = {
                //                     _id: Attr._id,
                //                     code: Attr.code
                //                 }

                //                 kvs_attr.Attvs_as = [];
                //                 for(let j in kvs_attr.Attvs) {
                //                     for(let n in Attr.Attvs) {
                //                         const Attv = Attr.Attvs[n];
                //                         if(kvs_attr.Attvs[j] === Attv._id) {
                //                             kvs_attr.Attvs_as.push({
                //                                 _id: Attv._id,
                //                                 code: Attv.code
                //                             })
                //                             break;
                //                         }
                //                     }
                //                 }

                //                 break;
                //             }
                //         }
                //     }
                // }

                /** is_usable => is_usable_format: String  */
                object.is_usable_format = object.is_usable ? "上架" : "下架";
            })
            context.commit('MT_list', { objects, dataFilter });

        } catch (e) {
            console.log(e);
            throw e;
        }
    },

    async add(context, data) {
        const { document } = data;
        let success = {};
        if (document && document.Pd) {  // 添加 Sku
            success = await api({
                url: "/h3/models/Sku/insertOne",
                data,
            });
        } else {    // 添加 Pd
            success = await api({
                url: "/h3/models/Pd/insertOne",
                data,
                is_formDate: data.document ? false : true
            });
        }
        context.commit('MT_add', success.document);
    },

    async insertMany(context, documents) {
        const data = { documents };
        const success = await api({
            url: "/h3/models/Pd/insertMany",
            data,
        });
        console.debug(" @@ 占位 ", context, success.name);
    },

    async update(context, data = {}) {
        const success = await api({
            url: "/h3/models/Pd/updateOne",
            data,
        });
        const { object } = success;
        context.commit('MT_update', [object]);
    },
    async updateSku(context, data = {}) {
        console.log(11111)
        console.debug(" @@ 占位 ", context);
        await api({
            url: "/h3/models/Sku/updateOne",
            data,
        });
        // const { object } = success;
        location.reload();
    },

    async updateMany(context, { ids, update }) {
        const data = { filter: { includes: { _id: ids } }, update };
        const success = await api({
            url: "/h3/models/Pd/updateMany",
            data,
        });
        console.log("占位", context, success)
    },

    async deleteSku(context, data) {
        // const {Pd, filter: {_id}} = data;
        delete data.Pd;
        const success = await api({
            url: "/h3/models/Sku/deleteOne",
            data
        })
        if (success.deletedResult.deletedCount === 0) {
            alert("删除失败")
        }
        console.debug(" @@ 占位 ", context);
        location.reload();
    },
    async deleteMany(context, ids) {

        const data = { filter: { includes: { _id: ids } } }
        const success = await api({
            url: "/h3/models/Pd/deleteMany",
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
            url: "/h3/models/Pd/deleteOne",
            data,
        });
        if (success.deletedResult.deletedCount === 0) {
            alert("删除失败")
        }
        context.commit('MT_remove', [_id]);
    }

}