import * as THREE from 'three'

// https://threejs.org/docs/index.html#api/zh/core/BufferGeometry
const geometry = new THREE.BufferGeometry()

const vertices = new Float32Array([
  20, 20, 10, //顶点1坐标
  250, 0, 0, //顶点2坐标
  0, 100, 0, //顶点3坐标
  0, 0, 10, //顶点4坐标
  0, 0, 100, //顶点5坐标
  50, 0, 10 //顶点6坐标
])

const attribute = new THREE.BufferAttribute(vertices, 3)
geometry.attributes.position = attribute

// https://threejs.org/docs/index.html#api/zh/materials/PointsMaterial
// 点材质
const material = new THREE.PointsMaterial({
  color: 0xffff00,
  size: 50
})

const ponits = new THREE.Points(geometry, material)

export default ponits
