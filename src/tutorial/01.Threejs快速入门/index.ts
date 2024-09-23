import * as THREE from 'three'

// 创建场景
const scene = new THREE.Scene()

// 创建几何体
const geometry = new THREE.BoxGeometry(100, 100, 100)

// 创建材质
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000 // 红色
})

// 创建网格模型
const mesh = new THREE.Mesh(geometry, material)

// 设置网格位置
mesh.position.set(100, 100, 100)

// 将网格模型添加到场景中
scene.add(mesh)

// 设置相机输出画布尺寸
const width = 800
const height = 500

// 创建相机
const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 3000)

// 设置相机位置
camera.position.set(1000, 1000, 1000)

// 设置相机观察的点
camera.lookAt(0, 0, 0) // 观察原点
// camera.lookAt(0, 10, 0) // 观察y轴上的点
// camera.lookAt(mesh.position) // 观察物体位置

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
renderer.render(scene, camera) 

// 将渲染器添加到页面中
document.body.appendChild(renderer.domElement)
