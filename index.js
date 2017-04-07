'use strict'

/**
 * Module dependencies.
 */

var createBaseCamera = require('perspective-camera/lib/camera-base')
var coalesce = require('defined')
var lookAt = require('gl-mat4/lookAt')
var ortho = require('gl-mat4/ortho')
var add = require('gl-vec3/add')

var kDefaultNearValue = 100
var kDefaultFarValue = 1

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

  var center = [0, 0, 0]
  var camera = createBaseCamera(opts)
  var updateBase = camera.update

  camera.near = coalesce(opts.near, kDefaultNearValue)
  camera.far = coalesce(opts.far, kDefaultFarValue)

  // intial update
  update()
  camera.update = update
  return camera

  function update() {
    var projection = camera.projection
    var direction = camera.direction
    var position = camera.position
    var viewport = camera.viewport
    var view = camera.view
    var near = camera.near
    var far = camera.far
    var up = camera.up

    var left = viewport[0]
    var bottom = viewport[1]
    var right = viewport[2]
    var top = viewport[3]

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
