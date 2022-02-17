<template>
  <div class="flex">
    <div id="stencil" class="w-[200px]"></div>
    <div id="graph-container"></div>
  </div>
</template>

<script lang="ts" setup>
import { Graph, Shape, Addon, Cell, CellView, Node } from '@antv/x6'
import { reactive, onMounted } from 'vue'
import { swimplate } from './swimlane'

const data = reactive({
  // 节点
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 40, // Number，必选，节点位置的 x 值
      y: 40, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'hello', // String，节点标签
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 160, // Number，必选，节点位置的 x 值
      y: 180, // Number，必选，节点位置的 y 值
      width: 80, // Number，可选，节点大小的 width 值
      height: 40, // Number，可选，节点大小的 height 值
      label: 'world', // String，节点标签
    },
  ],
  // 边
  edges: [
    {
      source: 'node1', // String，必须，起始节点 id
      target: 'node2', // String，必须，目标节点 id
    },
  ],
})

const init = () => {
  // #region 初始化画布
  const graph = new Graph({
    container: document.getElementById('graph-container') as HTMLElement,
    grid: true,
    width: 800,
    height: 600,
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: 'ctrl',
      minScale: 0.5,
      maxScale: 3,
    },
    connecting: {
      router: {
        name: 'manhattan',
        args: {
          padding: 1,
        },
      },
      connector: {
        name: 'rounded',
        args: {
          radius: 8,
        },
      },
      anchor: 'center',
      connectionPoint: 'anchor',
      allowBlank: false,
      snap: {
        radius: 20,
      },
      createEdge() {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: '#A2B1C3',
              strokeWidth: 2,
              targetMarker: {
                name: 'block',
                width: 12,
                height: 8,
              },
            },
          },
          zIndex: 0,
        })
      },
      validateConnection({ targetMagnet }) {
        return !!targetMagnet
      },
    },
    highlighting: {
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          attrs: {
            fill: '#5F95FF',
            stroke: '#5F95FF',
          },
        },
      },
    },
    resizing: false,
    rotating: false,
    selecting: {
      enabled: true,
      rubberband: true,
      showNodeSelectionBox: true,
    },
    snapline: true,
    keyboard: true,
    clipboard: true,
    // 泳道图的平移逻辑
    translating: {
      restrict(cellView: CellView) {
        const cell = cellView.cell as Node
        const parentId = cell.prop('parent')
        if (parentId) {
          const parentNode = graph.getCellById(parentId) as Node
          if (parentNode) {
            return parentNode.getBBox().moveAndExpand({
              x: 0,
              y: 30,
              width: 0,
              height: -30,
            })
          }
        }
        return cell.getBBox()
      },
    },
  })

  // stencil
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
  // #region 快捷键与事件
  // copy cut paste
  graph.bindKey(['meta+c', 'ctrl+c'], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.copy(cells)
    }
    return false
  })
  graph.bindKey(['meta+x', 'ctrl+x'], () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.cut(cells)
    }
    return false
  })
  graph.bindKey(['meta+v', 'ctrl+v'], () => {
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 })
      graph.cleanSelection()
      graph.select(cells)
    }
    return false
  })

  // undo redo
  graph.bindKey(['meta+z', 'ctrl+z'], () => {
    if (graph.history.canUndo()) {
      graph.history.undo()
    }
    return false
  })
  graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
    if (graph.history.canRedo()) {
      graph.history.redo()
    }
    return false
  })

  // select all
  graph.bindKey(['meta+a', 'ctrl+a'], () => {
    const nodes = graph.getNodes()
    if (nodes) {
      graph.select(nodes)
    }
  })

  // delete
  graph.bindKey('backspace', () => {
    const cells = graph.getSelectedCells()
    if (cells.length) {
      graph.removeCells(cells)
    }
  })

  // zoom
  graph.bindKey(['ctrl+1', 'meta+1'], () => {
    const zoom = graph.zoom()
    if (zoom < 1.5) {
      graph.zoom(0.1)
    }
  })
  graph.bindKey(['ctrl+2', 'meta+2'], () => {
    const zoom = graph.zoom()
    if (zoom > 0.5) {
      graph.zoom(-0.1)
    }
  })

  // 控制连接桩显示/隐藏
  const showPorts = (ports: NodeListOf<SVGElement>, show: boolean) => {
    for (let i = 0, len = ports.length; i < len; i += 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden'
    }
  }
  graph.on('node:mouseenter', () => {
    const container = document.getElementById('graph-container')!
    const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGElement>
    showPorts(ports, true)
  })
  graph.on('node:mouseleave', () => {
    const container = document.getElementById('graph-container')!
    const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGElement>
    showPorts(ports, false)
  })
  // #endregion

  // #region 初始化图形
  const ports = {
    groups: {
      top: {
        position: 'top',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      right: {
        position: 'right',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      bottom: {
        position: 'bottom',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
      left: {
        position: 'left',
        attrs: {
          circle: {
            r: 4,
            magnet: true,
            stroke: '#5F95FF',
            strokeWidth: 1,
            fill: '#fff',
            style: {
              visibility: 'hidden',
            },
          },
        },
      },
    },
    items: [
      {
        group: 'top',
      },
      {
        group: 'right',
      },
      {
        group: 'bottom',
      },
      {
        group: 'left',
      },
    ],
  }

  Graph.registerNode(
    'custom-rect',
    {
      inherit: 'rect',
      width: 66,
      height: 36,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        text: {
          fontSize: 12,
          fill: '#262626',
        },
      },
      ports: { ...ports },
    },
    true,
  )

  Graph.registerNode(
    'custom-polygon',
    {
      inherit: 'polygon',
      width: 66,
      height: 36,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        text: {
          fontSize: 12,
          fill: '#262626',
        },
      },
      ports: {
        ...ports,
        items: [
          {
            group: 'top',
          },
          {
            group: 'bottom',
          },
        ],
      },
    },
    true,
  )

  Graph.registerNode(
    'custom-circle',
    {
      inherit: 'circle',
      width: 45,
      height: 45,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        text: {
          fontSize: 12,
          fill: '#262626',
        },
      },
      ports: { ...ports },
    },
    true,
  )

  // 流程图的节点注册 start
  Graph.registerNode(
    'custom-image',
    {
      inherit: 'rect',
      width: 52,
      height: 52,
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'image',
        },
        {
          tagName: 'text',
          selector: 'label',
        },
      ],
      attrs: {
        body: {
          stroke: '#5F95FF',
          fill: '#5F95FF',
        },
        image: {
          width: 26,
          height: 26,
          refX: 13,
          refY: 16,
        },
        label: {
          refX: 3,
          refY: 2,
          textAnchor: 'left',
          textVerticalAnchor: 'top',
          fontSize: 12,
          fill: '#fff',
        },
      },
      ports: { ...ports },
    },
    true,
  )

  const r1 = graph.createNode({
    shape: 'custom-rect',
    label: '开始',
    attrs: {
      body: {
        rx: 20,
        ry: 26,
      },
    },
  })
  const r2 = graph.createNode({
    shape: 'custom-rect',
    label: '过程',
  })
  const r3 = graph.createNode({
    shape: 'custom-rect',
    attrs: {
      body: {
        rx: 6,
        ry: 6,
      },
    },
    label: '过程任务',
  })
  stencil.load([r1, r2, r3], 'group1')
  // 流程图的节点注册 end

  // 泳道图的节点注册 start
  Graph.registerNode(
    'lane',
    {
      inherit: 'rect',
      markup: [
        {
          tagName: 'rect',
          selector: 'body',
        },
        {
          tagName: 'rect',
          selector: 'name-rect',
        },
        {
          tagName: 'text',
          selector: 'name-text',
        },
      ],
      attrs: {
        body: {
          fill: '#FFF',
          stroke: '#5F95FF',
          strokeWidth: 1,
        },
        'name-rect': {
          width: 200,
          height: 30,
          fill: '#5F95FF',
          stroke: '#fff',
          strokeWidth: 1,
          x: -1,
        },
        'name-text': {
          ref: 'name-rect',
          refY: 0.5,
          refX: 0.5,
          textAnchor: 'middle',
          fontWeight: 'bold',
          fill: '#fff',
          fontSize: 12,
        },
      },
    },
    true,
  )

  Graph.registerNode(
    'lane-rect',
    {
      inherit: 'rect',
      width: 100,
      height: 60,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        text: {
          fontSize: 12,
          fill: '#262626',
        },
      },
    },
    true,
  )

  Graph.registerNode(
    'lane-polygon',
    {
      inherit: 'polygon',
      width: 80,
      height: 80,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
          refPoints: '0,10 10,0 20,10 10,20',
        },
        text: {
          fontSize: 12,
          fill: '#262626',
        },
      },
    },
    true,
  )

  Graph.registerEdge(
    'lane-edge',
    {
      inherit: 'edge',
      attrs: {
        line: {
          stroke: '#A2B1C3',
          strokeWidth: 2,
        },
      },
      label: {
        attrs: {
          label: {
            fill: '#A2B1C3',
            fontSize: 12,
          },
        },
      },
    },
    true,
  )
  // graph.fromJSON(data)
  // 生成泳道图
  const cells: Cell[] = []
  swimplate.forEach(item => {
    if (item.shape === 'lane-edge') {
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
