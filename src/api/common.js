import request from './request'


// 获取图片验证码
export function get_imgCode(sign) {
	return request.post('verifyCode/getImgVerifyCode', { sign })
}

// 验证图片验证码
export function is_imgCode(params) {
	return request.post('verifyCode/validateImgVerifyCode', params)
}

// 获取手机验证码
export function get_SMSCode(mobile) {
	return request.post('verifyCode/getSmsVerifyCode', { mobile })
}

// 验证手机验证码
export function is_SMSCode(params) {
	return request.post('verifyCode/validateSmsVerifyCode', params)
}

// 获取文件上传token
export function getUploadToken_api() {
	return request.post('file/getUploadToken')
}

