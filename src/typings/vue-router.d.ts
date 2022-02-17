export {}

//  pro-layout
declare module 'vue-router' {
  interface RouteMeta {
    name?: string // 当前模块可读名称
    icon?: string // 当前模块菜单显示图标
    hideInMenu?: boolean // 是否在管理端菜单隐藏
    activeMenuRouteName?: string // 激活的菜单名称，管理端菜单将依据自身name以及parentName进行匹配选中状态
    cache?: boolean // 当前页面是否需要被缓存
    cacheName?: string // 缓存名称
    affix?: boolean // 当前页面是否需要固定在标签栏
    hideInBreadcrumb?: boolean // 是否在面包屑中隐藏
    hideInTab?: boolean // 是否在标签栏中隐藏
  }
}
