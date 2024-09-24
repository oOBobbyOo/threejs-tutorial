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

// https://threejs.org/docs/index.html#api/zh/constants/Materials
// 正面：逆时针
// 反面：顺时针
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00, 
  // side: THREE.FrontSide // 默认只有正面可见
  // side: THREE.BackSide // 反面可见
  side: THREE.DoubleSide // 设置平面图形两边可见
})

const mesh = new THREE.Mesh(geometry, material)

export default mesh
