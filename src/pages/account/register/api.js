

const API = {
    verifycationCode: "message/api/captcha",
    //验证手机
    verifyTelphone: '/uaa/api/users/validate-tel',
    // 修改密码
    updatePassword: "uaa/api/user/password/forget",
	login: "auth/login",
    // changePassword: "/uaa/api/user/password/new"
    forgetPassword: "uaa/api/user/password/forget",
    getUserAccount: "uaa/api/account"
}
export default API;

//验证手机号
// export function verifyPhone () {
//     return request({
//         url: '/uaa/api/users/validate-tel',
//         method: 'get'
//     });
// }