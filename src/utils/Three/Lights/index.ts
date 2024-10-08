import type Viewer from '../Viewer'
import AmbientLight from './AmbientLight'
import DirectionalLight from './DirectionalLight'
import PointLight from './PointLight'

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
   */
  addAmbientLight(option = { color: 'rgb(255,255,255)' }) {
    const ambientLight = new AmbientLight(this.viewer, option)
    this.lightList.push(ambientLight)
    return ambientLight
  }

  /**
   * 添加点光源
   * @param option
   */
  addPointLight(position = [0, 40, 0], option = { color: 'rgb(255,255,255)' }) {
    const pointLight = new PointLight(this.viewer, position, option)
    this.lightList.push(pointLight)
    return pointLight
  }
}
