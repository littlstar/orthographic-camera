'use strict'

const reindex = require('mesh-reindex')
const unindex = require('unindex-mesh')
const camera = require('../')()
const lines = require('screen-projected-lines')
const bunny = require('bunny')
const regl = require('regl')()
const mat4 = require('gl-mat4')

// flatten bunny
Object.assign(bunny, reindex(unindex(bunny.positions, bunny.cells)))

bunny.positions = bunny.positions.map((p) => [p[0], p[1] - 4, p[2]])

Object.assign(bunny, lines(bunny))

// bunny model
const model = mat4.identity([])

// draw command
const draw = regl({
  vert: `
    uniform mat4 projection;
    uniform mat4 model;
    uniform mat4 view;
    attribute vec3 position;

    void main() {
      gl_Position = projection * view * model * vec4(position, 1.0);
    }
  `,

  frag: `
    void main() {
      gl_FragColor = vec4(0.8, 0.6, 0.75, 1.0);
    }
  `,

  uniforms: {
    projection: () => camera.projection,
    model: () => model,
    view: () => camera.view,
  },

  attributes: {
    position: bunny.positions
  },

  elements: bunny.cells,
  primitive: 'lines'
})

camera.translate([0, 0, 0])
mat4.translate(model, model, [0, 0, 0])
mat4.scale(model, model, [0.1, 0.1, 0.1])
regl.frame(({viewportWidth, viewportHeight, time}) => {
  const orbit = 2
  const x = Math.cos(0.2*time) * orbit
  const z = Math.sin(0.2*time) * orbit
  camera.identity()
  camera.translate([x, 0, z])
  camera.lookAt([0, 0, 0])
  camera.update()
  draw()
})
