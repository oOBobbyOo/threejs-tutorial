import type Viewer from '../Viewer'
import AmbientLight from './AmbientLight'
import DirectionalLight from './DirectionalLight'

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
    option = { color: 0xffffff }
  ) {
    const directionalLight = new DirectionalLight(this.viewer, position, option)
    this.lightList.push(directionalLight)
    return directionalLight
  }

  /**
   * 添加环境光源
   */
  addAmbientLight() {
    const ambientLight = new AmbientLight(this.viewer)
    this.lightList.push(ambientLight)
    return ambientLight
  }
}
