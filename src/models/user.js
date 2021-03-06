import getModalDesc from './curd';

//命名空间
const namespace = "user";
//全局提示
const alertMessage = "您可以在这里查看访客";
//默认每页条数
const pageSize = 7;
//操作列宽度
const actionWidth = 108;
//默认添加形式
const defaultCreateDesc = {
  model: namespace
}
//默认更新形式
const defaultUpdateDesc = {
  model: namespace
}
//默认拉取形式
const defaultReadDesc = {
  model: namespace,
  order: "id desc",
  page: 1,
  pageSize
}
//获取模型操作过程
const { effects, reducers } = getModalDesc(namespace, { defaultCreateDesc, defaultUpdateDesc, defaultReadDesc });

/*
 * 字段对应表  
 * columnMatch: {
 *   数据库字段名: [显示的字段名, 表格中是否开启,表单字段展示类型, 表单中是否开启, 表格列描述, 表格字段展示类型],
 *   id: ["ID", true, 'varchar'],
 *   column_2: [……],
 *   ……
 * }
 * 4个汉字宽90px 5个汉字宽105px
 */
const columnMatch = {
                     id: ["ID", true, 'varchar', true, "varchar required", {width: 70, fixed: 'left'}, true],
               username: ["用户名", false, 'varchar', true, "varchar", {width: 150}, true],
               password: ["密码", false, 'varchar', true, "varchar", {width: 250}, true],
                 gender: ["性别", true, 'gender', true, "varchar", {width: 70}, true],
               birthday: ["生日", true, 'date_time', true, "varchar", {width: 200}, true],
          register_time: ["注册时间", true, 'date_time', true, "varchar", {width: 200}, true],
        last_login_time: ["最后登陆时间", true, 'date_time', true, "varchar", {width: 300}, true],
          last_login_ip: ["最后登录IP", false, 'varchar', true, "varchar", {width: 200}, true],
          user_level_id: ["用户等级ID", false, 'varchar', true, "varchar", {width: 200}, true],
               nickname: ["昵称", true, 'varchar', true, "varchar", {width: 200}, true],
                 mobile: ["手机", true, 'varchar', true, "varchar", {width: 200}, true],
            register_ip: ["注册IP", false, 'varchar', true, "varchar", {width: 250}, true],
                 avatar: ["头像", true, 'image', true, "image", {width: 60}, true],
          weixin_openid: ["openid", false, 'varchar', true, "varchar", {width: 250}, true],
               add_time: ["添加时间", true, 'date_time', false, "varchar", {width: 200}, true],
};
//计算表格总宽度
const totalWidth = (() => {
  let totalWidth = 0;
  Object.keys(columnMatch).forEach(key => totalWidth += columnMatch[key][1]?columnMatch[key][5]["width"]:0);
  return totalWidth;
})();
export default {
  namespace,
  state: {
    dataList: [],
    columnMatch,
    alertMessage,
    totalWidth,
    pageSize,
    actionWidth,
    loading: false
  },
  subscriptions: {
    setup({ dispatch, history }) {
      let fun = location => {
        if(typeof fun["executed"] === "undefined"){
          const hash = window.location.hash.split("#/")[1];
          if(hash === 'user/list'){
            dispatch({
              type: 'readData'
            });
            fun["executed"] = true;
          }
        }
      };
      history.listen(fun);
    }
  },
  effects: {
    ...effects
  },
  reducers: {
    ...reducers
  }
}
