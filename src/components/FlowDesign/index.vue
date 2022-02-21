<template>
  <div class="flow-container">
    <div id="stencil" class="w-[264px] relative"></div>
    <div id="graph-container" class="flex-1"></div>
  </div>
</template>

<script lang="ts" setup>
import { Graph, Shape, Addon, Cell, CellView, Node, Edge } from '@antv/x6'
import { reactive, onMounted } from 'vue'
import { swimplate } from './swimlane'
import FdGraph from '@/components/FlowDesign/services/graph'
import FdStencil from '@/components/FlowDesign/services/stencil'
import Register from '@/components/FlowDesign/services/register'
import { nodes } from '@/components/FlowDesign/config/nodes'

const init = () => {
  const fdRegister = new Register()
  const fdGraph = new FdGraph()
  const graph = fdGraph.getModel()
  const fdStencil = new FdStencil()
  // const stencil = fdStencil.getModel()
  const stencil = new Addon.Stencil({
    title: '工作台',
    target: graph,
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
  document.getElementById('stencil')!.appendChild(stencil.container)

  const Nodes = nodes.map(item => {
    return graph.createNode(item)
  })
  console.log('==> nodes', Nodes)
  stencil.load(Nodes, 'group1')

  // graph.fromJSON(data)
  // 生成泳道图
  const cells: Cell[] = []
  swimplate.forEach(item => {
    if (item.shape === 'lane-edge') {
      console.log('=====>', item)
      cells.push(graph.createEdge(item))
    } else {
      cells.push(graph.createNode(item))
    }
  })
  graph.resetCells(cells)
  graph.zoomToFit({ padding: 10, maxScale: 1 })
}
onMounted(() => {
  init()
})
</script>

<style lang="less">
.flow-container {
  @apply flex;
  width: 100%;
  height: calc(100vh - 60px);
}
</style>
