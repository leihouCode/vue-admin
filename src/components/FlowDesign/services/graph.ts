import { Cell, CellView, Graph, Node, Shape } from '@antv/x6'
import { Options as GraphOptions } from '@antv/x6/src/graph/options'
import { Scroller } from '@antv/x6/src/addon/scroller'

export default class FdGraph {
  // graph typing
  // protected graph: Graph | Scroller
  graph: any

  constructor() {
    this.init()
  }

  init() {
    const graph = new Graph({
      container: document.getElementById('graph-container') as HTMLElement,
      grid: false,
      background: {
        color: '#F4F5F7',
      },
      autoResize: true,
      // width: 1000,
      // height: 800,
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
      snapline: true,
      keyboard: true,
      clipboard: true,
      panning: true,
      scroller: true,
      // 泳道图的平移逻辑
      translating: {
        restrict(cellView: CellView) {
          console.log('translating cell view', cellView.cell)
          const cell = cellView.cell as Node
          const parentId = cell.prop('parent')
          console.log('has parentId', parentId)
          console.log('type', cell.prop('type'))
          const cellType = cell.prop('type')
          if (cellType === 'stencil' || !parentId) return cell.getBBox()
          const parentNode = graph.getCellById(parentId) as Node
          if (parentNode) {
            console.log('parent BBOX', parentNode.getBBox())
            return parentNode.getBBox().moveAndExpand({
              x: 0,
              y: 30,
              width: 0,
              height: -30,
            })
          }
          return cell.getBBox()
        },
      },
    })

    this.graph = graph
    console.log('graph', graph, this.graph)
    this.bindEvents()
  }

  bindEvents() {
    const { graph } = this
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

    // 连线的监听
    graph.on('edge:connected', (e: any) => {
      const { id: currentEdgeId } = e.edge
      const cells: Cell[] = graph.getCells()
      const currentEdge: any = cells.find(c => c.id === currentEdgeId)
      const { source, target } = currentEdge.store.data
      console.log('===>', currentEdge.store.data)
      const newEdge = new Shape.Edge({
        id: `${source.cell}2`,
        shape: 'lane-edge',
        source: source.cell,
        target: target.cell,
        zIndex: 10,
        // router: 'manhattan',
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
      })
      console.log('new edge', newEdge)
      cells.push(newEdge)

      graph.resetCells(cells)
    })
  }

  getModel() {
    return this.graph
  }

  getGraph() {
    return this.graph
  }
}
