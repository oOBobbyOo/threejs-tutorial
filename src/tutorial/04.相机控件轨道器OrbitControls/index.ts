import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// 创建场景
const scene = new THREE.Scene()

// 创建几何体
const geometry = new THREE.BoxGeometry(100, 100, 100)

// 创建材质，MeshBasicMaterial 不受光源的影响
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  transparent: true, // 开启透明
  opacity: 0.5 // 设置透明度
})

// 创建网格模型
const mesh = new THREE.Mesh(geometry, material)

// 设置网格位置
mesh.position.set(100, 100, 100)

// 将网格模型添加到场景中
scene.add(mesh)

// 添加三位坐标轴
const axes = new THREE.AxesHelper(300)
scene.add(axes)

// 添加光源
const light = new THREE.PointLight(0xff0000, 1, 0)
light.position.set(500, 700, 300)
scene.add(light)

// 设置相机输出画布尺寸
const width = 800
const height = 500

// 创建相机
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)

// 设置相机位置
camera.position.set(500, 500, 500)

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

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

// 监听轨道控制器变化，重新渲染
controls.addEventListener('change', () => {
  renderer.render(scene, camera)
})
