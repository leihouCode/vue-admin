import { Validator } from '@/services/validator'

interface RulesOptions {
  validator?: unknown
  trigger?: 'change' | 'blur'
  max?: number
  min?: number
}
const commonInput = (message: string, options: RulesOptions = {}) => {
  return [
    {
      required: true,
      message,
      ...options,
    },
  ]
}
const validator = new Validator()

export const loginFormRules = {
  phone: validator.getCommonRules('请输入手机号'),
  password: validator.getCommonRules('请输入登录密码'),
  imgCode: validator.getCommonRules('请输入图片验证码'),
}
