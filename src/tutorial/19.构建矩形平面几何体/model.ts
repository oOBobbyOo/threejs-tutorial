import * as THREE from 'three'

// https://threejs.org/docs/index.html#api/zh/core/BufferGeometry
const geometry = new THREE.BufferGeometry()

// 构建平面矩形
const vertices = new Float32Array([
  // 第一个三角形
  0, 0, 0, 
  80, 0, 0, 
  80, 80, 0,
  // 第二个三角形
  0, 0, 0, 
  80, 80, 0, 
  0, 80, 0
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
  side: THREE.DoubleSide, // 设置平面图形两边可见
})

const mesh = new THREE.Mesh(geometry, material)

export default mesh
