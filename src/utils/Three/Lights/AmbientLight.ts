import * as THREE from 'three'
import type Viewer from '../Viewer'

// 灯光参数
type LightOption = {
  color?: THREE.ColorRepresentation
  intensity?: number
}

/**
 * 环境光
 * @see https://threejs.org/docs/index.html?q=AmbientLight#api/zh/lights/AmbientLight
 */
export default class AmbientLight {
  protected viewer: Viewer
  public light: THREE.AmbientLight

  constructor(_viewer: Viewer, option = { color: 'rgb(255,255,255)' }) {
    this.viewer = _viewer
    const color = new THREE.Color(option.color)
    this.light = new THREE.AmbientLight(color)
    this.setOption(option)
    this.viewer.scene.add(this.light)
  }

  /**
   * 设置灯光参数
   * @param option
   */
  setOption(option: LightOption = {}) {
    this.light.intensity = option.intensity || 1 // 光线强度
  }
}
