import {
  AxesHelper,
  Cache,
  PerspectiveCamera,
  Raycaster,
  Scene,
  SRGBColorSpace,
  Vector2,
  WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'three/addons/libs/stats.module.js'

import type { Animate } from '../type'
import SkyBoxs from '../SkyBoxs'
import Lights from '../Lights'

export default class Viewer {
  public id: string
  public viewerDom!: HTMLElement
  public scene!: Scene
  public lights!: Lights
  public camera!: PerspectiveCamera
  public renderer!: WebGLRenderer
  public controls!: OrbitControls
  public skyboxs!: SkyBoxs
  public animateEventList: Animate[] = []
  public statsControls!: Stats
  public statsUpdateObj: any = {}
  public raycaster!: Raycaster
  public mouse!: Vector2
  public isDestroy: boolean = false

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
    this.#initSkybox()
    this.#initRaycaster()

    this.mouse = new Vector2()

    const animate = () => {
      if (this.isDestroy) return
      requestAnimationFrame(animate)

      this.#updateDom()
      this.#readerDom()

      // 全局的公共动画函数，添加函数可同步执行
      this.animateEventList.forEach((event) => {
        event.fun && event.content && event.fun(event.content)
      })
    }

    animate()
  }

  // 初始化场景界面
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

  // 初始化天空盒
  #initSkybox() {
    if (!this.skyboxs) this.skyboxs = new SkyBoxs(this)
    this.skyboxs.addSkybox('night')
    this.skyboxs.addFog()
  }

  // 初始化灯光
  #initLight() {
    if (!this.lights) {
      this.lights = new Lights(this)
    }
  }

  // 注册鼠标事件监听
  #initRaycaster() {
    this.raycaster = new Raycaster()
  }

  // 渲染DOM
  #readerDom() {
    this.renderer.render(this.scene, this.camera)
  }

  // 更新DOM
  #updateDom() {
    this.controls.update()
    // 设置相机的宽高比
    this.camera.aspect =
      this.viewerDom.clientWidth / this.viewerDom.clientHeight // 摄像机视锥体的长宽比，通常是使用画布的宽/画布的高
    // 更新相机的投影矩阵
    this.camera.updateProjectionMatrix() // 在任何参数被改变以后必须被调用,来使得这些改变生效
    // 设置渲染器的尺寸
    this.renderer.setSize(
      this.viewerDom.clientWidth,
      this.viewerDom.clientHeight
    )
    // 设置设备像素比
    this.renderer.setPixelRatio(window.devicePixelRatio)
  }

  // 销毁场景
  destroy() {
    this.scene.traverse((child: any) => {
      if (child.material) {
        child.material.dispose()
      }
      if (child.geometry) {
        child.geometry.dispose()
      }
      child = null
    })
    this.renderer.forceContextLoss()
    this.renderer.dispose()
    this.scene.clear()

    this.isDestroy = true
  }

  /**
   * 添加全局的动画事件
   * @param animate 函数加参数对象
   * 传入对象 = {
      fun: 函数名称,
      content: 函数参数
    }
  */
  addAnimate(animate: Animate) {
    this.animateEventList.push(animate)
  }

  // 移除全局的动画事件
  removeAnimate(animate: Animate) {
    this.animateEventList.map((val, i) => {
      if (val === animate) this.animateEventList.splice(i, 1)
    })
  }

  // 添加坐标轴辅助器
  addAxesHelper() {
    // 显示坐标轴(x轴: 红色、 y轴: 绿色、 z轴: 蓝色)
    const axesHelper = new AxesHelper(1000)
    this.scene?.add(axesHelper)
  }

  // 添加性能状态监测
  addStats() {
    if (!this.statsControls) this.statsControls = new Stats()
    this.statsControls.dom.style.position = 'absolute'
    this.viewerDom.appendChild(this.statsControls.dom)

    // 添加到动画
    this.statsUpdateObj = {
      fun: this.statsUpdate,
      content: this.statsControls
    }

    this.addAnimate(this.statsUpdateObj)
  }

  // 更新性能状态监测
  statsUpdate(statsControls: Stats) {
    statsControls.update()
  }

  // 移除性能状态检测
  removeStats() {
    if (this.statsControls && this.statsUpdateObj) {
      this.viewerDom.removeChild(this.statsControls.dom)
      this.removeAnimate(this.statsUpdateObj)
    }
  }
}
