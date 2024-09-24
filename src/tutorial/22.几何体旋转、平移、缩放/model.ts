import * as THREE from 'three'

// 创建几何体 BufferGeometry(基类)
// https://threejs.org/docs/index.html#api/zh/core/BufferGeometry

// BoxGeometry：长方体
// const geometry = new THREE.BoxGeometry(100, 100, 100)

// SphereGeometry：球体
// const geometry = new THREE.SphereGeometry(50)

// CylinderGeometry：圆柱
// const geometry = new THREE.CylinderGeometry(50, 50, 100)

// PlaneGeometry：矩形平面
const geometry = new THREE.PlaneGeometry(100, 50)

// CircleGeometry：圆形平面
// const geometry = new THREE.CircleGeometry(50)

// 查看几何体属性
// console.log('[ geometry ] >>:', geometry)
// console.log('[ position ] >>:', geometry.attributes.position)
// console.log('[ index ] >>:', geometry.index)

// 缩放
geometry.scale(2, 2, 2)
// 移动
geometry.translate(50, 50, 50)
// 绕x轴转动
geometry.rotateX(Math.PI / 4) // 旋转 45 度
// 居中
geometry.center()

// 创建材质 漫反射网格材质(受光照影响)
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  // side: THREE.FrontSide // 默认只有正面可见
  // side: THREE.BackSide // 反面可见
  side: THREE.DoubleSide, // 设置平面图形两边可见
  wireframe: true // 线框模式, 默认值为false（即渲染为平面多边形）。
})

const mesh = new THREE.Mesh(geometry, material)

export default mesh
