// 初始化图形
import { Node } from '@antv/x6/src/model/node'

export const initNodes = []

// 节点
export const nodes: Node.Metadata[] = [
  {
    shape: 'rect-node',
    label: '过程任务',
    attrs: {
      body: {
        rx: 6,
        ry: 6,
        fill: 'rgba(74, 129, 254, 0.1)',
        stroke: '#4A81FE',
      },
      label: {
        fill: '#3A3A3D',
      },
    },
  },
  {
    shape: 'rect-node',
    label: '输出材料',
    size: {
      width: 66,
      height: 36,
    },
    attrs: {
      body: {
        rx: 6,
        ry: 6,
        fill: '#fff',
        stroke: '#4A81FE',
      },
      label: {
        fill: '#4A81FE',
      },
    },
  },
]
