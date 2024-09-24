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
  // 0, 0, 0,   // 移除位置相同的点
  // 80, 80, 0, // 移除位置相同的点
  0, 80, 0
])

// 创建属性缓冲区对象
const attribute = new THREE.BufferAttribute(vertices, 3)
// 设置几何体attribute属性的位置
geometry.attributes.position = attribute

// 定义法向量
const normals = new Float32Array([
  0, 0, 1, //顶点1法线量
  0, 0, 1, //顶点2法线量
  0, 0, 1, //顶点3法线量
  0, 0, 1 //顶点4法线量
])
// 设置几何体的顶点法线属性：attributes.anormal
geometry.attributes.normal = new THREE.BufferAttribute(normals, 3)

// Uint16Array 类型数组创建顶点索引数据
const indexes = new Uint16Array(
  // 下面索引值对应顶点位置数据中的顶点坐标
  [0, 1, 2, 0, 2, 3]
)
geometry.index = new THREE.BufferAttribute(indexes, 1)

// 创建材质 漫反射网格材质(受光照影响)
const material = new THREE.MeshLambertMaterial({
  color: 0x00ff00,
  // side: THREE.FrontSide // 默认只有正面可见
  // side: THREE.BackSide // 反面可见
  side: THREE.DoubleSide // 设置平面图形两边可见
})

const mesh = new THREE.Mesh(geometry, material)

export default mesh
