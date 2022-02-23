import { defineStore } from 'pinia'
import { LoginFormState } from '@/views/login/typings'

export const useStore = defineStore({
  id: 'globalState',
  state: () => ({
    app: '',
  }),
  getters: {
    app2(state) {
      return state.app
    },
  },
  actions: {
    setApp(name: string) {
      this.app = name
    },
    handleLogin(params: LoginFormState) {
      console.log('params', params)
      return new Promise(resolve => {
        resolve('login success')
      })
    },
  },
})
