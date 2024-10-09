import * as THREE from 'three'
import type Viewer from '../Viewer'
import type { CallbackFn, EventName } from '../type'

export default class RaycasterEvent {
  protected viewer: Viewer
  public eventName: EventName
  public callback: CallbackFn

  constructor(
    _viewer: Viewer,
    eventName: EventName = 'click',
    callback: CallbackFn
  ) {
    this.viewer = _viewer
    this.eventName = eventName
    this.callback = callback
  }

  startSelect() {
    this.stopSelect()
    this.viewer.renderer.domElement.addEventListener(
      this.eventName,
      this.handleEvent.bind(this)
    )
  }

  stopSelect() {
    this.viewer.renderer.domElement.removeEventListener(
      this.eventName,
      this.handleEvent.bind(this)
    )
  }

  getMouse(event: MouseEvent) {
    const mouse = new THREE.Vector2() // 创建鼠标坐标
    const width = this.viewer.renderer.domElement.clientWidth
    const height = this.viewer.renderer.domElement.clientHeight
    mouse.x = (event.offsetX / width) * 2 - 1
    mouse.y = -(event.offsetY / height) * 2 + 1
    return mouse
  }

  handleEvent(event: any) {
    const raycaster = new THREE.Raycaster() // 创建射线
    const mouse = this.getMouse(event) // 获取鼠标坐标
    raycaster.setFromCamera(mouse, this.viewer.camera) // 设置射线的起点和终点
    // TODO: 第一个参数是否需要外部传入，减小监听范围
    const intersects = raycaster.intersectObject(this.viewer.scene, true) // 检测射线与模型是否相交
    if (intersects.length > 0 && intersects[0]) {
      this.callback(intersects[0].object)
    }
  }
}
