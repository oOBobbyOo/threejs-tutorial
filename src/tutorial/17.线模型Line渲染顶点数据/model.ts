import * as THREE from 'three'

// https://threejs.org/docs/index.html#api/zh/core/BufferGeometry
const geometry = new THREE.BufferGeometry()

const vertices = new Float32Array([
  20,
  20,
  10, //顶点1坐标
  250,
  0,
  0, //顶点2坐标
  0,
  100,
  0, //顶点3坐标
  0,
  0,
  10, //顶点4坐标
  0,
  0,
  100, //顶点5坐标
  50,
  0,
  10 //顶点6坐标
])

// 创建属性缓冲区对象
const attribute = new THREE.BufferAttribute(vertices, 3)
// 设置几何体attribute属性的位置
geometry.attributes.position = attribute

// https://threejs.org/docs/index.html#api/zh/materials/LineBasicMaterial
// 线材质
const material = new THREE.LineBasicMaterial({
  color: 0xffff00 // 设置线条颜色(黄色)
})

// 创建线模型对象
// const line = new THREE.Line(geometry, material)

// 闭合线条
// const line = new THREE.LineLoop(geometry, material)

// 非连续的线条
const line = new THREE.LineSegments(geometry, material)

export default line
