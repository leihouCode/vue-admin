interface RulesOptions {
  message?: string
  required?: boolean
  validator?: unknown
  trigger?: 'change' | 'blur'
  max?: number
  min?: number
}

export class Validator {
  readonly defaultInputRules: RulesOptions = {
    required: true,
    max: 20,
    min: 1,
  }

  constructor() {}

  getInputRules(options: RulesOptions): RulesOptions[] {
    const rules = { ...this.defaultInputRules, ...options }
    return [rules]
  }

  getCommonRules(message: string): RulesOptions[] {
    const rules = { ...this.defaultInputRules, message }
    return [rules]
  }
}
