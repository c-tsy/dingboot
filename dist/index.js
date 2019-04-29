"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
/**
 * 钉钉群通知机器人Api
 * @see https://open-doc.dingtalk.com/microapp/serverapi2/qf2nxq
 */
class Dingboot {
    constructor(token) {
        this.t = "https://oapi.dingtalk.com/robot/send?access_token=";
        this.t = this.t + token;
    }
    post(data) {
        return axios_1.default.post(this.t, data).then((d) => { return d.data; });
    }
    /**
     * 发送文字信息推送
     * @param content
     * @param at 被@人的手机号(在text内容里要有@手机号)
     * @param all
     */
    text(content, at = [], all = false) {
        return this.post(get_ding_data(DingMsgType.text, { content }, at, all));
    }
    /**
     * 发送Markdown文档
     * @param title 首屏会话透出的展示内容
     * @param text markdown格式的消息
     * @param at 被@人的手机号(在text内容里要有@手机号)
     * @param all
     */
    markdown(title, text, at = [], all = false) {
        return this.post(get_ding_data(DingMsgType.markdown, { title, text }, at, all));
    }
    /**
     * 发送Link类型
     * @param title
     * @param text
     * @param messageUrl
     * @param picUrl
     */
    link(title, text, messageUrl, picUrl = '') {
        return this.post(get_ding_data(DingMsgType.text, { title, text, picUrl, messageUrl }, [], false));
    }
}
exports.default = Dingboot;
/**
 * 钉钉通知消息类型
 * @see https://open-doc.dingtalk.com/microapp/serverapi2/qf2nxq
 */
var DingMsgType;
(function (DingMsgType) {
    /**
     * 文本消息
     */
    DingMsgType["text"] = "text";
    /**
     * Markdown文档格式
     */
    DingMsgType["markdown"] = "markdown";
    /**
     * 链接形式
     */
    DingMsgType["link"] = "link";
    /**
     * 图文带按钮可独立跳转类型
     */
    DingMsgType["actionCard"] = "actionCard";
    /**
     * 新闻推送类型
     */
    DingMsgType["feedCard"] = "feedCard";
})(DingMsgType = exports.DingMsgType || (exports.DingMsgType = {}));
function get_ding_data(type, data, at, all = false) {
    return {
        msgtype: type,
        [type]: data,
        at: {
            atMobile: at,
            isAtAll: all,
        }
    };
}
exports.get_ding_data = get_ding_data;
//# sourceMappingURL=index.js.map