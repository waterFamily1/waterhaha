

const API = {
    verifycationCode: "message/api/captcha",
    //验证手机
    verifyTelphone: "message/api/captcha/validity",
    // 修改密码
    updatePassword: "uaa/api/user/password/forget",
	login: "auth/login",
    // changePassword: "/uaa/api/user/password/new"
    forgetPassword: "uaa/api/user/password/forget",
    getUserAccount: "uaa/api/account"
}
export default API;