import type Viewer from '../Viewer'
import AmbientLight from './AmbientLight'
import DirectionalLight from './DirectionalLight'
import HemisphereLight from './HemisphereLight'
import PointLight from './PointLight'
import RectAreaLight from './RectAreaLight'
import SpotLight from './SpotLight'

export default class Lights {
  protected viewer: Viewer
  public lightList: any[]

  constructor(viewer: Viewer) {
    this.viewer = viewer
    this.lightList = []
  }

  /**
   * 添加平行光源
   * @param position
   * @param option
   */
  addDirectionalLight(
    position = [200, 200, 200],
    option = { color: 'rgb(255,255,255)' }
  ) {
    const directionalLight = new DirectionalLight(this.viewer, position, option)
    this.lightList.push(directionalLight)
    return directionalLight
  }

  /**
   * 添加环境光源
   * @param option
   */
  addAmbientLight(option = { color: 'rgb(255,255,255)' }) {
    const ambientLight = new AmbientLight(this.viewer, option)
    this.lightList.push(ambientLight)
    return ambientLight
  }

  /**
   * 添加点光源
   * @param position
   * @param option
   */
  addPointLight(position = [0, 40, 0], option = { color: 'rgb(255,255,255)' }) {
    const pointLight = new PointLight(this.viewer, position, option)
    this.lightList.push(pointLight)
    return pointLight
  }

  /**
   * 添加矩形光源
   * @param position
   * @param option
   */
  addRectAreaLight(
    position = [0, 40, 0],
    option = { color: 'rgb(255,255,255)' }
  ) {
    const rectAreaLight = new RectAreaLight(this.viewer, position, option)
    this.lightList.push(rectAreaLight)
    return rectAreaLight
  }

  /**
   * 添加锥形光源
   * @param position
   * @param option
   */
  addSpotLight(position = [0, 40, 0], option = { color: 'rgb(255,255,255)' }) {
    const pointLight = new SpotLight(this.viewer, position, option)
    this.lightList.push(pointLight)
    return pointLight
  }

  /**
   * 添加锥形光源
   * @param position
   * @param option
   */
  addHemisphereLight(
    position = [0, 40, 0],
    option = { color: 'rgb(255,255,255)' }
  ) {
    const hemisphereLight = new HemisphereLight(this.viewer, position, option)
    this.lightList.push(hemisphereLight)
    return hemisphereLight
  }

  /**
   * 移除灯光
   * @param light 灯光
   */
  removeLight(light: any) {
    this.viewer.scene.remove(light)
  }
}
