import {
  AmbientLight,
  AxesHelper,
  Cache,
  DirectionalLight,
  PerspectiveCamera,
  Raycaster,
  Scene,
  SRGBColorSpace,
  Vector2,
  WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'


export default class Viewer {
  public id: string
  public viewerDom!: HTMLElement
  public scene!: Scene
  public camera!: PerspectiveCamera
  public renderer!: WebGLRenderer
  public controls!: OrbitControls
  public statsControls!: Stats
  public raycaster!: Raycaster
  public mouse!: Vector2

  constructor(id: string) {
    Cache.enabled = true // 开启缓存
    this.id = id
    this.#initViewer()
  }

  #initViewer() {
    this.#initRenderer()
    this.#initScene()
    this.#initLight()
    this.#initCamera()
    this.#initControl()
    this.#initRaycaster()

    this.mouse = new Vector2()
  }

  // 创建初始化场景界面
  #initRenderer() {
    // 获取画布dom
    this.viewerDom = document.getElementById(this.id) as HTMLElement

    // 初始化渲染器
    this.renderer = new WebGLRenderer({
      // logarithmicDepthBuffer: true, // 表示是否使用对数深度缓冲
      antialias: true, // true/false 表示是否开启反锯齿
      alpha: true, // true/false 表示是否可以设置背景色透明
      precision: 'highp', // highp/mediump/lowp 表示着色精度选择
      premultipliedAlpha: true // true/false 表示是否可以设置像素深度（用来度量图像的分辨率）
      // preserveDrawingBuffer: false, // true/false 表示是否保存绘图缓冲
      // physicallyCorrectLights: true, // true/false 表示是否开启物理光照
    })

    this.renderer.clearDepth()
    this.renderer.shadowMap.enabled = true
    // 可以看到更亮的材质，同时这也影响到环境贴图
    this.renderer.outputColorSpace = SRGBColorSpace
    // 将渲染器画布添加到页面容器中
    this.viewerDom.appendChild(this.renderer.domElement)
  }

  // 初始化场景
  #initScene() {
    this.scene = new Scene()
  }

  // 初始化相机
  #initCamera() {
    // 透视相机
    this.camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      2000
    )
    // 设置相机位置
    this.camera.position.set(4, 2, -3)
    // 设置相机观察原点
    this.camera.lookAt(0, 0, 0)
  }

  // 初始化控制器
  #initControl() {
    // 创建控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    // 是否开启阻尼
    this.controls.enableDamping = false
    // 定义当平移的时候摄像机的位置将如何移动, 摄像机将在与摄像机向上方向垂直的平面中平移
    this.controls.screenSpacePanning = false
    // 设置相机向内移动多少
    this.controls.minDistance = 2
    // 设置相机向外移动多少
    this.controls.maxDistance = 1000
    this.controls.addEventListener('change', () => {
      this.renderer.render(this.scene, this.camera)
    })
  }

  // 初始化灯光
  #initLight() {
    // 创建环境光
    const ambient = new AmbientLight(0xffffff, 0.6)
    // 添加环境光到场景中
    this.scene.add(ambient)

    // 创建平行光
    const light = new DirectionalLight(0xffffff)
    light.position.set(0, 200, 100)
    light.castShadow = true
    light.shadow.camera.top = 180
    light.shadow.camera.bottom = -100
    light.shadow.camera.left = -120
    light.shadow.camera.right = 400
    light.shadow.camera.near = 0.1
    light.shadow.camera.far = 400
    // 设置mapSize属性可以使阴影更清晰，不那么模糊
    light.shadow.mapSize.set(1024, 1024)
    // 添加平行光到场景中
    this.scene.add(light)
  }

  // 注册鼠标事件监听
  #initRaycaster() {
    this.raycaster = new Raycaster()
  }

  // 添加坐标轴辅助器
  addAxesHelper() {
    // 显示坐标轴(x轴: 红色、 y轴: 绿色、 z轴: 蓝色)
    const axesHelper = new AxesHelper(1000)
    this.scene?.add(axesHelper)
  }

  // 添加性能状态监测
  addStats() {
    if (!this.statsControls) return
    this.statsControls = new Stats()
    this.statsControls.dom.style.position = 'absolute'
    this.viewerDom.appendChild(this.statsControls.dom)
  }
}
