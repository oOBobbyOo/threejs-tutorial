import * as THREE from 'three'
import type Viewer from '../Viewer'

// 灯光参数
type LightOption = {
  color?: THREE.ColorRepresentation
  intensity?: number
  distance?: number
  decay?: number
}

/**
 * 点光源
 * @see https://threejs.org/docs/index.html#api/zh/lights/PointLight
 */
export default class PointLight {
  protected viewer: Viewer
  public light: THREE.PointLight
  public mesh: THREE.Mesh

  constructor(
    _viewer: Viewer,
    position = [0, 40, 0],
    option = { color: 'rgb(255,255,255)' }
  ) {
    this.viewer = _viewer
    const color = new THREE.Color(option.color)
    this.light = new THREE.PointLight(color)
    this.light.castShadow = true

    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(1, 10, 10),
      new THREE.MeshBasicMaterial({ color: color })
    )
    this.light.add(this.mesh)

    this.viewer.scene.add(this.light)
    this.setOption(option)
    this.setPosition(position)
  }

  /**
   * 设置灯光参数
   * @param option
   */
  setOption(option: LightOption = {}) {
    this.light.intensity = option.intensity || 20 // 光线强度
    this.light.distance = option.distance || 200 // 光线距离
    this.light.decay = option.decay || 1 // 光的衰减指数
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
