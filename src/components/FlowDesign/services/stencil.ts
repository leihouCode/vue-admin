import { Addon } from '@antv/x6'
import { Stencil } from '@antv/x6/src/addon/stencil'
import FdGraph from '@/components/FlowDesign/services/graph'
import { nodes } from '@/components/FlowDesign/config/nodes'

export default class FdStencil extends FdGraph {
  protected stencil = {}

  constructor() {
    super()
    this.init()
  }

  init() {
    const stencil = new Addon.Stencil({
      title: '工作台',
      target: this.graph,
      stencilGraphWidth: 200,
      stencilGraphHeight: 180,
      collapsable: true,
      groups: [
        {
          title: '添加节点',
          name: 'group1',
        },
      ],
      layoutOptions: {
        columns: 2,
        columnWidth: 80,
        rowHeight: 55,
      },
    })

    this.stencil = stencil
  }

  getModel(): any {
    return this.stencil
  }
}
