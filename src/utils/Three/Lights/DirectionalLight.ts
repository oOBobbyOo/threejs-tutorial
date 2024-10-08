import * as THREE from 'three'
import type Viewer from '../Viewer'

// 灯光参数
type LightOption = {
  color?: THREE.ColorRepresentation
  intensity?: number
  castShadow?: boolean
  mapSize?: number
}

/**
 * 平行光
 * @see https://threejs.org/docs/index.html?q=DirectionalLight#api/zh/lights/DirectionalLight
 */
export default class DirectionalLight {
  protected viewer: Viewer
  public light: THREE.DirectionalLight

  constructor(
    _viewer: Viewer,
    position = [200, 200, 200],
    option = { color: 'rgb(255,255,255)' }
  ) {
    this.viewer = _viewer
    this.light = new THREE.DirectionalLight(new THREE.Color(option.color))
    this.setPosition(position)
    this.setOption(option)
    this.viewer.scene.add(this.light)
  }

  /**
   * 设置灯光参数
   * @param option
   */
  setOption(option: LightOption = {}) {
    const light = this.light
    light.intensity = option.intensity || 2 // 光线强度
    light.castShadow = option.castShadow || true // 是否有阴影
    light.shadow.mapSize.width = option.mapSize || 2048 // 阴影像素
    light.shadow.mapSize.height = option.mapSize || 2048
    // 阴影范围
    const d = 80
    light.shadow.camera.left = -d
    light.shadow.camera.right = d
    light.shadow.camera.top = d
    light.shadow.camera.bottom = -d
    light.shadow.bias = -0.0005 // 解决条纹阴影的出现
    // 最大可视距和最小可视距
    light.shadow.camera.near = 0.01
    light.shadow.camera.far = 2000
  }

  /**
   * 设置灯光位置
   * @param x
   * @param y
   * @param z
   */
  setPosition([x, y, z]: number[]) {
    if (this.light) this.light.position.set(x || 0, y || 0, z || 0)
  }
}
