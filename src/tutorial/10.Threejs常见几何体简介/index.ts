import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// 创建场景
const scene = new THREE.Scene()

// 创建几何体
// BoxGeometry：长方体
// const geometry = new THREE.BoxGeometry(100, 100, 100)

// SphereGeometry：球体
// const geometry = new THREE.SphereGeometry(50)

// CylinderGeometry：圆柱
// const geometry = new THREE.CylinderGeometry(50, 50, 100)

// PlaneGeometry：矩形平面
// const geometry = new THREE.PlaneGeometry(100, 50)

// CircleGeometry：圆形平面
const geometry = new THREE.CircleGeometry(50)

// 创建材质，MeshBasicMaterial 不受光源的影响
const material = new THREE.MeshBasicMaterial({
  color: 0x00ffff,
  transparent: true, // 开启透明
  opacity: 0.5, // 设置透明度
  // side: THREE.FrontSide // 默认只有正面可见
  side: THREE.DoubleSide // 设置平面图形两边可见
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

// 设置相机输出画布尺寸
// 设置画布全屏
const width = window.innerWidth
const height = window.innerHeight

// 创建相机
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)
// 设置相机位置
camera.position.set(500, 500, 500)

// 设置相机观察的点
camera.lookAt(0, 0, 0) // 观察原点

// 创建渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(width, height)
// 将渲染器添加到页面中
document.body.appendChild(renderer.domElement)

// 渲染函数
function render() {
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}
render()

const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', () => {
  renderer.render(scene, camera)
})

function onWindowResize() {
  // 设置相机的宽高比
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新相机
  camera.updateProjectionMatrix()
  // 设置画布的大小
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)
}

// 监控页面大小的变换
window.addEventListener('resize', onWindowResize, false)
