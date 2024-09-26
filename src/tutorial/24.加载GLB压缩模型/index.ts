import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'

// 创建场景
const scene = new THREE.Scene()
// 设置场景背景颜色
scene.background = new THREE.Color(0x333333)
// scene.background = new THREE.Color(0xcccccc)
// 设置场景线性雾, 雾的密度是随着距离线性增大的
scene.fog = new THREE.Fog(0x333333, 10, 15)

scene.environment = new RGBELoader().load(
  './texture/ferrari/moonless_golf_1k.hdr'
  // './texture/ferrari/venice_sunset_1k.hdr'
)
scene.environment.mapping = THREE.EquirectangularReflectionMapping

// 创建网格对象
const grid = new THREE.GridHelper(40, 40, 0xffffff, 0xffffff)
grid.material.opacity = 0.3 // 设置材质的透明度
grid.material.depthWrite = false
grid.material.transparent = true
scene.add(grid)

// https://threejs.org/docs/index.html?q=gltf#examples/zh/loaders/GLTFLoader
// 创建GLTF加载器
const glftLoader = new GLTFLoader()

// https://threejs.org/docs/index.html?q=DRACOLoader#examples/zh/loaders/DRACOLoader
// 创建DRACO加载器
const dracoLoader = new DRACOLoader()
// 设置解码器路径
dracoLoader.setDecoderPath('./draco/ferrari/')
// 设置GLTF加载器使用DRACO解码器
glftLoader.setDRACOLoader(dracoLoader)

// 创建纹理加载器
const texture = new THREE.TextureLoader()
// 引入阴影效果
const shadow = texture.load('./models/ferrari/ferrari_ao.png')

// https://threejs.org/docs/index.html?q=MeshPhysicalMaterial#api/zh/materials/MeshPhysicalMaterial
// 创建物理网格材质， 汽车车身的材质
const bodyMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 1.0, // 材质与金属的相似度。非金属材质，如木材或石材，使用0.0，金属使用1.0
  roughness: 0.5, // 材质的粗糙程度。0.0表示平滑的镜面反射，1.0表示完全漫反射。默认值为1.0。如果还提供roughnessMap，则两个值相乘。
  clearcoat: 1.0,
  clearcoatRoughness: 0
})

// 创建标准网格材质，汽车轮毂的材质
const detailsMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  metalness: 1.0,
  roughness: 0.5
})

// 创建物理网格材质，汽车玻璃的材质
const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  metalness: 0, 
  roughness: 0.1,
  transmission: 1.0,
  transparent: true
})

// 保存车轮的模块
const wheels: THREE.Mesh[] = []

// 加载模型
glftLoader.load('./model/ferrari/ferrari.glb', (gltf) => {
  // 将模型添加到场景中
  // scene.add(gltf.scene)

  const carModel = gltf.scene.children[0]
  console.log(carModel)

  // 设置汽车车身的材质
  const body = carModel.getObjectByName('body') as THREE.Mesh
  body.material = bodyMaterial

  // 设置汽车轮毂的材质
  const rim_fl = carModel.getObjectByName('rim_fl') as THREE.Mesh
  const rim_fr = carModel.getObjectByName('rim_fr') as THREE.Mesh
  const rim_rr = carModel.getObjectByName('rim_rr') as THREE.Mesh
  const rim_rl = carModel.getObjectByName('rim_rl') as THREE.Mesh
  rim_fl.material = detailsMaterial
  rim_fr.material = detailsMaterial
  rim_rr.material = detailsMaterial
  rim_rl.material = detailsMaterial

  // 设置汽车座椅的材质
  const trim = carModel.getObjectByName('trim') as THREE.Mesh
  trim.material = detailsMaterial

  // 设置汽车玻璃的材质
  const glass = carModel.getObjectByName('glass') as THREE.Mesh
  glass.material = glassMaterial

  const wheel_fl =  carModel.getObjectByName('wheel_fl') as THREE.Mesh
  const wheel_fr = carModel.getObjectByName('wheel_fr') as THREE.Mesh
  const wheel_rl = carModel.getObjectByName('wheel_rl') as THREE.Mesh
  const wheel_rr = carModel.getObjectByName('wheel_rr') as THREE.Mesh

  // 将车轮的模块保存到数组中，后面可以设置动画效果
  wheels.push(wheel_fl, wheel_fr, wheel_rl, wheel_rr)

  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.655 * 4, 1.3 * 4),
    new THREE.MeshBasicMaterial({
      map: shadow,
      blending: THREE.MultiplyBlending,
      toneMapped: false,
      transparent: true
    })
  )
  //设置阴影效果x轴方向的角度
  mesh.rotation.x = -Math.PI / 2
  mesh.renderOrder = 2
  carModel.add(mesh)

  scene.add(carModel)
})

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
const camera = new THREE.PerspectiveCamera(40, width / height, 0.3, 100)

// 设置相机位置
// camera.position.set(-3.5, 2, -4.5)
camera.position.set(5, 3, 3)

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
// controls.autoRotate = true

// 设置相机向外移动多少
controls.maxDistance = 9
// 设置相机向内移动多少
controls.minDistance = 1
// 设置垂直旋转的角度的上限，范围是0到Math.PI，其默认值为Math.PI
controls.maxPolarAngle = THREE.MathUtils.degToRad(90)
controls.target.set(0, 0.5, 0)

// 渲染函数
function render() {
  controls.update()

  const time = -performance.now() / 1000
  // 控制车轮的动画效果
  for (let i = 0; i < wheels.length; i++) {
    wheels[i].rotation.x = time * Math.PI * 2
  }
  //控制网格的z轴移动
  grid.position.z = -time % 1

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
