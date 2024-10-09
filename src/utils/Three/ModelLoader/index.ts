import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import type Viewer from '../Viewer'
import type { CallbackFn } from '../type'

export default class ModelLoader {
  protected viewer: Viewer
  private gltfLoader: GLTFLoader
  private dracoLoader: DRACOLoader

  constructor(viewer: Viewer, dracolPath: string = '/draco/') {
    this.viewer = viewer
    this.gltfLoader = new GLTFLoader() // 加载gltf模型
    this.dracoLoader = new DRACOLoader() // 加载经过Draco压缩的gltf模型

    this.dracoLoader.setDecoderPath(dracolPath) // 设置draco模型解码器路径
    this.gltfLoader.setDRACOLoader(this.dracoLoader) // 设置draco模型加载器
  }

  /**
   * 加载模型到场景中-
   * @param url 模型路径
   * @param callback 回调模型对象
   * @param progress 返回加载进度
   */
  public loadModelToScene(
    url: string,
    callback: CallbackFn,
    progress: CallbackFn
  ) {
    this.loadModel(
      url,
      (gltf) => {
        this.viewer.scene.add(gltf.scene)
        callback?.(gltf)
      },
      (num) => {
        progress?.(num) // 加载进度
      }
    )
  }

  /**
   * 加载模型
   * @param url 模型路径
   * @param callback 回调模型对象
   * @param progress 返回加载进度
   */
  public loadModel(url: string, callback: CallbackFn, progress: CallbackFn) {
    this.gltfLoader.load(
      url,
      (gltf) => {
        callback?.(gltf)
      },
      (xhr) => {
        progress?.((xhr.loaded / xhr.total).toFixed(2))
      },
      (error) => {
        console.error('模型加载失败', error)
      }
    )
  }
}
