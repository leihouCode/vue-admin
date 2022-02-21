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
      },
    },
  },
  {
    shape: 'rect-node',
    label: '输出材料',
    size: {
      width: 66,
      height: 66,
    },
    attrs: {
      body: {
        rx: 6,
        ry: 6,
      },
    },
  },
]
