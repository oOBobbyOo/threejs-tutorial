import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

// 创建场景
const scene = new THREE.Scene()

// 创建几何体
const geometry = new THREE.BoxGeometry(100, 100, 100)

// 创建材质， 受光源的影响
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
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

// 添加点光源
const pointLight = new THREE.PointLight(0xffffff, 1, 0)
pointLight.position.set(200, 300, 200)
// scene.add(pointLight)

// 添加点光源源辅助
const lightHelper = new THREE.PointLightHelper(pointLight, 20)
scene.add(lightHelper)

// 添加环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambientLight)

// 添加平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(100, 200, 150)
directionalLight.target = mesh
scene.add(directionalLight)

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  5
)
scene.add(directionalLightHelper)

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
renderer.render(scene, camera) // 渲染场景和相机

// 将渲染器添加到页面中
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.addEventListener('change', () => {
  renderer.render(scene, camera)
})
