import { Graph } from '@antv/x6'
import { FlowOptions } from '@/components/FlowDesign/typings'

// 连接桩
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

export default class Register {
  private ports = ports

  constructor() {
    this.registerNodes()
  }

  registerNodes() {
    Graph.registerNode(
      'rect-node',
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
        ports: { ...this.ports },
        parent: '',
        type: 'rect',
        zIndex: 100,
      },
      true,
    )
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
            stroke: '#F4F5F7',
            strokeWidth: 1,
          },
          'name-rect': {
            width: FlowOptions.SWIMLANE_WIDTH,
            height: 48,
            fill: '#fff',
            stroke: '#F4F5F7',
            strokeWidth: 1,
            x: -1,
          },
          'name-text': {
            ref: 'name-rect',
            refY: 0.5,
            refX: 0.5,
            textAnchor: 'middlea',
            fontWeight: 'bold',
            fill: '#3A3A3D',
            fontSize: 14,
          },
        },
      },
      true,
    )

    Graph.registerNode(
      'lane-rect',
      {
        inherit: 'rect',
        width: FlowOptions.SWIMLANE_WIDTH,
        height: 60,
        attrs: {
          body: {
            strokeWidth: 1,
            stroke: '#F4F5F7',
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
            stroke: '#F4F5F7',
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
  }
}
