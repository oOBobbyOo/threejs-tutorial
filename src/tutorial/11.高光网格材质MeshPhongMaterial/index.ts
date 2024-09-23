import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// 创建场景
const scene = new THREE.Scene()

// 创建几何体
// BoxGeometry：长方体
// const geometry = new THREE.BoxGeometry(100, 100, 100)

// SphereGeometry：球体
const geometry = new THREE.SphereGeometry(50)

// CylinderGeometry：圆柱
// const geometry = new THREE.CylinderGeometry(50, 50, 100)

// PlaneGeometry：矩形平面
// const geometry = new THREE.PlaneGeometry(100, 50)

// CircleGeometry：圆形平面
// const geometry = new THREE.CircleGeometry(50)

// 创建材质
// MeshBasicMaterial: 基础网格材质 (不受光照影响)
// MeshLambertMaterial: 漫反射网格材质（与光照有反应）
// MeshPhongMaterial: 高光网格材质（与光照有反应）
// MeshStandardMaterial: 标准网格材质（与光照有反应）
// MeshPhysicalMaterial: 物理网格材质（与光照有反应）

// https://threejs.org/docs/index.html#api/zh/materials/MeshPhongMaterial
const material = new THREE.MeshPhongMaterial({
  color: 0xff0000, // 设置材质的颜色
  shininess: 100, // 高光部分的亮度
  specular: 0xffffff // 高光部分的颜色
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

// 光源设置
// 添加环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambientLight)

// 添加平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(400, 200, 300)
scene.add(directionalLight)

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

// 创建轨道控制器
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
