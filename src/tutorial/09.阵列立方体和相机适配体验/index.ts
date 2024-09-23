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


for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    // 创建网格模型
    const mesh = new THREE.Mesh(geometry, material)
    // 设置网格位置
    mesh.position.set(i * 200, 100, j * 200)
    // 将网格模型添加到场景中
    scene.add(mesh)
  }
}

// 添加三位坐标轴
const axes = new THREE.AxesHelper(300)
scene.add(axes)

// 添加点光源
const pointLight = new THREE.PointLight(0xffffff, 1, 0)
pointLight.position.set(400, 300, 200)
scene.add(pointLight)

// 添加环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
scene.add(ambientLight)

// 设置相机输出画布尺寸
// 设置画布全屏
const width = window.innerWidth
const height = window.innerHeight

// 创建相机
// const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000)
// 设置广角可以增大视角
const camera = new THREE.PerspectiveCamera(60, width / height, 1, 8000)

// 设置相机位置
// camera.position.set(500, 500, 500)
camera.position.set(2000, 2000, 2000)

// 设置相机观察的点
// camera.lookAt(0, 0, 0) // 观察原点
camera.lookAt(1000, 0, 1000)

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

// 添加相机控件在改变相机的lookAt的同时也要改变controls的位置
const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(1000, 0, 1000) // 与相机观察点一致
controls.update() // update()函数内会执行camera.lookAt(controls.target)

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
