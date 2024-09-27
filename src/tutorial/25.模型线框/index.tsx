import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// 创建场景
const scene = new THREE.Scene()

// 创建组
const modal = new THREE.Group()

// 创建立方体
const geometry = new THREE.BoxGeometry(10, 10, 10)
// 创建材质
const material = new THREE.MeshPhongMaterial({
  color: 0x004444,
  transparent: true,
  opacity: 0.5
})
// 创建网格
const mesh = new THREE.Mesh(geometry, material)
modal.add(mesh)

// https://threejs.org/docs/index.html?q=EdgesGeometry#api/zh/geometries/EdgesGeometry
// 创建线框
const edges = new THREE.EdgesGeometry(geometry)
// 创建线框材质
const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x00ffff })
// 创建线框网格
const line = new THREE.LineSegments(edges, edgesMaterial)
modal.add(line)

// 将模型添加到场景中
scene.add(modal)

// 添加三位坐标轴
const axes = new THREE.AxesHelper(10)
scene.add(axes)

// 添加点光源
const pointLight = new THREE.PointLight(0xffffff, 1, 0)
pointLight.position.set(200, 300, 200)
scene.add(pointLight)

// 添加环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambientLight)

// 添加平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(100, 200, 150)
scene.add(directionalLight)

// 设置相机输出画布尺寸
const width = window.innerWidth
const height = window.innerHeight

// 创建相机
const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 3000)

// 设置相机位置
camera.position.set(50, 50, 50)

// 设置相机观察的点
camera.lookAt(0, 0, 0) // 观察原点

// 创建渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true // 设置抗锯齿
})
// 设置设备像素比
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(width, height)

// 将渲染器添加到页面中
document.body.appendChild(renderer.domElement)

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼
controls.enableDamping = true
// 设置控制器阻尼系数
controls.dampingFactor = 0.05
// 设置控制器的自动旋转
controls.autoRotate = true

// 渲染函数
function render() {
  controls.update()
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()

function onWindowResize() {
  // 重置相机的宽高比
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新相机的投影矩阵
  camera.updateProjectionMatrix()
  // 重置渲染器的宽高比
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)
}

// 监控页面大小的变换
window.addEventListener('resize', onWindowResize, false)
