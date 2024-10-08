import * as THREE from 'three'
import type Viewer from '../Viewer'

// 灯光参数
type LightOption = {
  color?: THREE.ColorRepresentation
  groundColor?: THREE.ColorRepresentation
  intensity?: number
}

/**
 * 半球光
 * @see https://threejs.org/docs/index.html#api/zh/lights/HemisphereLight.groundColor
 */
export default class HemisphereLight {
  protected viewer: Viewer
  public light: THREE.HemisphereLight

  constructor(
    _viewer: Viewer,
    position = [0, 40, 0],
    option = { color: 'rgb(255,255,255)' }
  ) {
    this.viewer = _viewer
    const color = new THREE.Color(option.color)
    this.light = new THREE.HemisphereLight(color)
    this.setOption(option)
    this.setPosition(position)
    this.viewer.scene.add(this.light)
  }

  /**
   * 设置灯光参数
   * @param option
   */
  setOption(option: LightOption = {}) {
    this.light.intensity = option.intensity || 20 // 光线强度
    const groundColor = new THREE.Color(
      option.groundColor || 'rgb(255,255,255)'
    )
    this.light.groundColor = groundColor // 在构造时传递的地面发出光线的颜色
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
