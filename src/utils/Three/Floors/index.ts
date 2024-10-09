import * as THREE from 'three'
import type Viewer from '../Viewer'

type FloorOption = {
  color?: THREE.ColorRepresentation
  width?: number
  height?: number
}

export default class Floors {
  protected viewer: Viewer

  constructor(
    _viewer: Viewer,
    option = { width: 100, height: 100, color: 'rgb(255,255,255)' }
  ) {
    this.viewer = _viewer
    this.initFlooer(option)
  }

  private initFlooer(option: FloorOption) {
    const color = new THREE.Color(option.color)
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(option.width, option.height),
      new THREE.MeshPhongMaterial({ color, depthWrite: false })
    )
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    this.viewer.scene.add(ground)
  }

  /**
   * 添加网格辅助线
   */
  public addGridHelper({
    size = 500,
    divisions = 20,
    colorCenterLine = 0x888888,
    colorGrid = 0x888888
  }) {
    const grid = new THREE.GridHelper(
      size,
      divisions,
      colorCenterLine,
      colorGrid
    )
    this.viewer.scene.add(grid)
  }
}
