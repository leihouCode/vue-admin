import { Cell, Graph } from '@antv/x6'
import StageMenu from './stageMenu.vue'
import '@antv/x6-vue3-shape'

// Graph.registerNode('stage-menu', {
//   inherit: 'vue3-shape',
//   x: 200,
//   y: 150,
//   width: 150,
//   height: 100,
//   component: {
//     // template: `<StageMenu />`,
//     component: StageMenu,
//   },
// })
const CONFIG = {
  width: 300,
  height: 700,
  position: {
    x: 60,
    y: 60,
  },
}

export const swimplate = [
  {
    id: '1',
    shape: 'lane',
    type: 'stencil',
    width: CONFIG.width,
    height: CONFIG.height,
    position: CONFIG.position,
    label: '01 项目准备',
    // tools: [
    //   {
    //     name: 'button',
    //     args: {
    //       markup: [
    //         {
    //           tagName: 'circle',
    //           selector: 'button',
    //           attrs: {
    //             r: 14,
    //             stroke: '#fe854f',
    //             strokeWidth: 0,
    //             fill: '#5F95FF',
    //             cursor: 'pointer',
    //           },
    //         },
    //         {
    //           tagName: 'text',
    //           textContent: '...',
    //           selector: 'icon',
    //           attrs: {
    //             fill: '#ffffff',
    //             fontSize: 16,
    //             textAnchor: 'middle',
    //             pointerEvents: 'none',
    //             y: '0',
    //           },
    //         },
    //       ],
    //       x: '100%',
    //       y: '0%',
    //       offset: { x: -20, y: 15 },
    //       onClick(cell) {
    //         console.log(cell)
    //         const rect = cell.cell._model.graph.addNode({
    //           id: 'StageMenu',
    //           shape: 'vue3-shape',
    //           component: StageMenu,
    //           x: 100,
    //           y: 60,
    //           width: 20,
    //           height: 20,
    //           zIndex: 1000,
    //         })
    //       },
    //     },
    //   },
    // ],
  },
  {
    id: '2',
    shape: 'lane',
    type: 'stencil',
    width: 300,
    height: 700,
    position: {
      x: 360,
      y: 60,
    },
    label: '02 系统实施',
  },
  {
    id: '3',
    shape: 'lane',
    type: 'stencil',
    width: 300,
    height: 700,
    position: {
      x: 660,
      y: 60,
    },
    label: '03 系统上线',
  },
  {
    id: '4',
    shape: 'lane',
    type: 'stencil',
    width: 300,
    height: 700,
    position: {
      x: 960,
      y: 60,
    },
    label: '04 项目验收',
  },

  // {
  //   id: '5',
  //   shape: 'lane-rect',
  //   width: 100,
  //   height: 60,
  //   position: {
  //     x: 110,
  //     y: 120,
  //   },
  //   label: 'Start',
  //   attrs: {
  //     body: {
  //       rx: 30,
  //       ry: 30,
  //     },
  //   },
  //   parent: '1',
  // },
  // {
  //   id: '6',
  //   shape: 'lane-rect',
  //   width: 100,
  //   height: 60,
  //   position: {
  //     x: 320,
  //     y: 120,
  //   },
  //   label: 'Process',
  //   parent: '2',
  // },
  // {
  //   id: '7',
  //   shape: 'lane-polygon',
  //   width: 80,
  //   height: 80,
  //   position: {
  //     x: 520,
  //     y: 110,
  //   },
  //   label: 'Judge',
  //   parent: '3',
  // },
  // {
  //   id: '8',
  //   shape: 'lane-rect',
  //   width: 100,
  //   height: 60,
  //   position: {
  //     x: 510,
  //     y: 240,
  //   },
  //   label: 'Process',
  //   parent: '3',
  // },
  // {
  //   id: '9',
  //   shape: 'lane-rect',
  //   width: 100,
  //   height: 60,
  //   position: {
  //     x: 720,
  //     y: 240,
  //   },
  //   label: 'Process',
  //   parent: '4',
  // },
  // {
  //   id: '10',
  //   shape: 'lane-rect',
  //   width: 100,
  //   height: 60,
  //   position: {
  //     x: 720,
  //     y: 350,
  //   },
  //   label: 'Process',
  //   parent: '4',
  // },
  // {
  //   id: '11',
  //   shape: 'lane-polygon',
  //   width: 80,
  //   height: 80,
  //   position: {
  //     x: 520,
  //     y: 340,
  //   },
  //   label: 'Judge',
  //   parent: '3',
  // },
  // {
  //   id: '12',
  //   shape: 'lane-rect',
  //   width: 100,
  //   height: 60,
  //   position: {
  //     x: 510,
  //     y: 470,
  //   },
  //   label: 'Process',
  //   parent: '3',
  // },
  // {
  //   id: '13',
  //   shape: 'lane-rect',
  //   width: 100,
  //   height: 60,
  //   position: {
  //     x: 300,
  //     y: 470,
  //   },
  //   label: 'End',
  //   attrs: {
  //     body: {
  //       rx: 30,
  //       ry: 30,
  //     },
  //   },
  //   parent: '2',
  // },
  // {
  //   id: '14',
  //   shape: 'lane-edge',
  //   source: '5',
  //   target: '6',
  // },
  // {
  //   id: '15',
  //   shape: 'lane-edge',
  //   source: '6',
  //   target: '7',
  // },
  // {
  //   id: '16',
  //   shape: 'lane-edge',
  //   source: '7',
  //   target: '8',
  //   label: 'Yes',
  // },
  // {
  //   id: '17',
  //   shape: 'lane-edge',
  //   source: '7',
  //   target: '9',
  //   label: 'No',
  // },
  // {
  //   id: '18',
  //   shape: 'lane-edge',
  //   source: '8',
  //   target: '9',
  // },
  // {
  //   id: '19',
  //   shape: 'lane-edge',
  //   source: '9',
  //   target: '10',
  // },
  // {
  //   id: '20',
  //   shape: 'lane-edge',
  //   source: '10',
  //   target: '11',
  // },
  // {
  //   id: '21',
  //   shape: 'lane-edge',
  //   source: '11',
  //   target: '12',
  //   label: 'Yes',
  // },
  // {
  //   id: '22',
  //   shape: 'lane-edge',
  //   source: '6',
  //   target: '7',
  //   label: 'No',
  // },
  // {
  //   id: '23',
  //   shape: 'lane-edge',
  //   source: '12',
  //   target: '13',
  // },
]
