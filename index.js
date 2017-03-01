'use strict'

/**
 * Module dependencies.
 */

const createBaseCamera = require('perspective-camera/lib/camera-base')
const coalesce = require('defined')
const lookAt = require('gl-mat4/lookAt')
const ortho = require('gl-mat4/ortho')
const add = require('gl-vec3/add')

const kDefaultNearValue = 100
const kDefaultFarValue = 1

/**
 * Creates an orthographic camera interface.
 *
 * @public opts
 * @param {?Object}
 */

module.exports = createOrthographicCamera
function createOrthographicCamera(opts) {
  if (!opts || 'object' != typeof opts) {
    opts = {}
  }

  const center = [0, 0, 0]
  const camera = createBaseCamera(opts)
  const updateBase = camera.update

  camera.near = coalesce(opts.near, kDefaultNearValue)
  camera.far = coalesce(opts.far, kDefaultFarValue)

  // intial update
  update()
  return Object.assign(camera, {update})

  function update() {
    const {
      projection,
      direction,
      position,
      viewport,
      view,
      near,
      far,
      up
    } = camera

    const {0: left, 1: bottom, 2: right, 3: top} = viewport

    // update projection
    ortho(projection, left, right, bottom, top, near, far)

    // update camera center position
    add(center, position, direction)

    // update view
    lookAt(view, position, center, up)

    // update base
    updateBase()

    return camera
  }
}
