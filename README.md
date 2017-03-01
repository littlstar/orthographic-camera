orthographic-camera
===================

[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

[![demo-image](http://i.imgur.com/anR1By6.png)](http://littlstar.github.io/orthographic-camera/)

[demo](http://littlstar.github.io/orthographic-camera/) - [source](demo/index.js)

A high-level 3D orthographic camera built on top of components in
[perspective-camera](https://github.com/Jam3/perspective-camera)

```js
const createCamera = require('orthographic-camera')
const camera = createCamera({near: 1, far: 1000 })

const orbit = 2
const x = Math.cos(0.2*time) * orbit
const z = Math.sin(0.2*time) * orbit

camera.identity()
camera.translate([x, 0, z])
camera.lookAt([0, 0, 0])
camera.update()
```

See [demo/index.js](demo/index.js) for a full example using
[regl](https://github.com/regl-project/regl)

## Usage

See [perspective-camera](https://github.com/Jam3/perspective-camera) for
more usage.

## See Also

- [camera-unproject](https://www.npmjs.com/package/camera-unproject)
- [camera-project](https://www.npmjs.com/package/camera-project)
- [camera-picking-ray](https://www.npmjs.com/package/camera-picking-ray)
- [ray-3d](https://www.npmjs.com/package/ray-3d)
- [ray-aabb-intersection](https://www.npmjs.com/package/ray-aabb-intersection)
- [ray-sphere-intersection](https://www.npmjs.com/package/ray-sphere-intersection)
- [ray-plane-intersection](https://www.npmjs.com/package/ray-plane-intersection)
- [ray-triangle-intersection](https://www.npmjs.com/package/ray-triangle-intersection)

## License

MIT, see [LICENSE.md](http://github.com/littlstar/orthographic-camera/blob/master/LICENSE.md) for details.
