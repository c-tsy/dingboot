import axios from 'axios'
/**
 * 钉钉群通知机器人Api
 * @see https://open-doc.dingtalk.com/microapp/serverapi2/qf2nxq
 */
export default class Dingboot {
    protected t: string = "https://oapi.dingtalk.com/robot/send?access_token=";
    constructor(token: string) {
        this.t = this.t + token;
    }
    post(data): Promise<any> {
        return axios.post(this.t, data).then((d) => { return d.data });
    }
    /**
     * 发送文字信息推送
     * @param content 
     * @param at 被@人的手机号(在text内容里要有@手机号)
     * @param all 
     */
    text(content: string, at: string[] = [], all: boolean = false) {
        return this.post(get_ding_data(DingMsgType.text, { content }, at, all))
    }
    /**
     * 发送Markdown文档
     * @param title 首屏会话透出的展示内容
     * @param text markdown格式的消息
     * @param at 被@人的手机号(在text内容里要有@手机号)
     * @param all 
     */
    markdown(title: string, text: string, at: string[] = [], all: boolean = false) {
        return this.post(get_ding_data(DingMsgType.markdown, { title, text }, at, all))
    }
    /**
     * 发送Link类型
     * @param title 
     * @param text 
     * @param messageUrl 
     * @param picUrl 
     */
    link(title: string, text: string, messageUrl: string, picUrl: string = '') {
        return this.post(get_ding_data(DingMsgType.text, { title, text, picUrl, messageUrl }, [], false))
    }
}
/**
 * 钉钉通知消息类型
 * @see https://open-doc.dingtalk.com/microapp/serverapi2/qf2nxq
 */
export enum DingMsgType {
    /**
     * 文本消息
     */
    text = 'text',
    /**
     * Markdown文档格式
     */
    markdown = "markdown",
    /**
     * 链接形式
     */
    link = 'link',
    /**
     * 图文带按钮可独立跳转类型
     */
    actionCard = 'actionCard',
    /**
     * 新闻推送类型
     */
    feedCard = 'feedCard'
}
export function get_ding_data(type: string, data: Object, at: string[], all: boolean = false) {
    return {
        msgtype: type,
        [type]: data,
        at: {
            atMobile: at,
            isAtAll: all,
        }
    }
}