import * as THREE from 'three'

import atmosphereFragmentShader from '../../shaders/atmosphere/fragment.glsl'
import atmosphereVertexShader from '../../shaders/atmosphere/vertex.glsl'
// 导入着色器
import planetFragmentShader from '../../shaders/planet/fragment.glsl'
import planetVertexShader from '../../shaders/planet/vertex.glsl'
import Experience from '../experience.js'

// 构建单个星球
export default class Planet {
  constructor(options = {}) {
    // 获取 Experience 单例实例
    this.experience = new Experience()

    // 通过 experience 实例访问核心组件和工具
    this.scene = this.experience.scene
    this.resources = this.experience.resources
    this.debug = this.experience.debug
    this.time = this.experience.time

    // 星球属性 - 支持传入参数
    this.planet = null
    this.radius = options.radius || 1.0 // 星球半径，支持传入
    this.textureName = options.texture || 'planetTexture' // 纹理名称，支持传入
    this.position = { x: 0, y: 0, z: 0 } // 星球位置
    this.rotation = { x: 0, y: 0, z: 0 } // 星球旋转速度

    // 默认参数
    const defaultParams = {
      ambientLight: '#a08ebd',
      ambientLightIntensity: 0.25,
      pointLightColor: '#d8aaf5',
      pointLightIntensity: 6.0,
      pointLightPosition: {
        x: 0.0,
        y: 0.0,
      },
      roughness: 0.7,
      metalness: 0.1,
      normalScale: 1.0,
      displacementScale: 0.1,
      // 大气层颜色
      atmosphereDayColor: '#7248eb',
      atmosphereTwilightColor: '#3c40e1',
      atmosphereIntensity: 3.0,
      atmosphereThickness: 1.5,
      // 自转属性
      rotationSpeed: {
        x: 0.2,
        y: 0.2,
        z: 0.0,
      },
    }

    // 合并参数
    this.params = this.deepMerge(defaultParams, options.params || {})

    // 应用自转速度
    this.rotation.x = this.params.rotationSpeed.x
    this.rotation.y = this.params.rotationSpeed.y
    this.rotation.z = this.params.rotationSpeed.z

    // 初始化星球
    this.init()

    // 添加调试控制
    if (this.debug.active) {
      this.debugInit()
      this.debuggerInit() // 新增的光照调节面板
    }
  }

  init() {
    // 创建星球几何体（增加细分以支持置换）
    this.geometry = new THREE.IcosahedronGeometry(this.radius, 64, 64)

    // 设置主纹理 & 各项异性过滤
    const texture = this.resources.items[this.textureName]
    texture.generateMipmaps = true
    texture.minFilter = THREE.LinearMipMapLinearFilter
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 8

    // 设置法线贴图 & 各项异性过滤
    const normalMap = this.resources.items.planetNormal
    normalMap.generateMipmaps = true
    normalMap.minFilter = THREE.LinearMipMapLinearFilter
    normalMap.anisotropy = 8

    // 设置置换贴图 & 各项异性过滤
    const displacementMap = this.resources.items.planetDisplacement
    displacementMap.generateMipmaps = true
    displacementMap.minFilter = THREE.LinearMipMapLinearFilter
    displacementMap.anisotropy = 8
    // 创建着色器材质，模拟光照
    this.material = new THREE.ShaderMaterial({
      vertexShader: planetVertexShader,
      fragmentShader: planetFragmentShader,
      uniforms: {
        // 纹理
        uTexture: { value: texture },
        uNormalMap: { value: normalMap },
        uDisplacementMap: { value: displacementMap },

        // 贴图强度
        uNormalScale: { value: this.params.normalScale },
        uDisplacementScale: { value: this.params.displacementScale },

        // 环境光（柔和的蓝白色环境光）
        uAmbientLight: new THREE.Uniform(new THREE.Color(this.params.ambientLight)),
        uAmbientLightIntensity: { value: this.params.ambientLightIntensity },

        // 点光源颜色
        uPointLightColor: { value: new THREE.Color(this.params.pointLightColor) },
        uPointLightIntensity: { value: this.params.pointLightIntensity },

        // 点光源位置
        uPointLightPosition: { value: new THREE.Vector3(this.params.pointLightPosition.x, 1, this.params.pointLightPosition.y) },

        // 材质属性
        uRoughness: { value: this.params.roughness },
        uMetalness: { value: this.params.metalness },

      },
    })

    // 创建星球网格
    this.planet = new THREE.Mesh(this.geometry, this.material)
    this.planet.position.set(this.position.x, this.position.y, this.position.z)

    // 创建大气层
    this.createAtmosphere()

    // 创建点光源位置指示器
    this.createLightIndicator()

    // 添加到场景
    this.scene.add(this.planet)
  }

  // 创建大气层
  createAtmosphere() {
    // 创建大气层几何体，半径比星球大 4%
    const atmosphereRadius = this.radius * 1.14
    this.atmosphereGeometry = new THREE.IcosahedronGeometry(atmosphereRadius, 64, 32)

    // 创建大气层材质
    this.atmosphereMaterial = new THREE.ShaderMaterial({
      vertexShader: atmosphereVertexShader,
      fragmentShader: atmosphereFragmentShader,
      uniforms: {
        // 点光源位置
        uPointLightPosition: { value: new THREE.Vector3(this.params.pointLightPosition.x, 0, this.params.pointLightPosition.y) },

        // 大气效果参数
        uAtmosphereDayColor: { value: new THREE.Color(this.params.atmosphereDayColor) },
        uAtmosphereTwilightColor: { value: new THREE.Color(this.params.atmosphereTwilightColor) },
        uAtmosphereIntensity: { value: this.params.atmosphereIntensity },
        uAtmosphereThickness: { value: this.params.atmosphereThickness },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide, // 从内部渲染
    })

    // 创建大气层网格
    this.atmosphere = new THREE.Mesh(this.atmosphereGeometry, this.atmosphereMaterial)
    this.atmosphere.position.copy(this.planet.position)

    // 添加到场景
    this.scene.add(this.atmosphere)
  }

  // 创建点光源位置指示器
  createLightIndicator() {
    // 创建二十面体几何体作为光源指示器
    this.lightIndicatorGeometry = new THREE.IcosahedronGeometry(0.1, 0)

    // 创建发光材质
    this.lightIndicatorMaterial = new THREE.MeshBasicMaterial({
      color: this.params.pointLightColor,
      transparent: true,
      opacity: 0.8,
    })

    // 创建光源指示器网格
    this.lightIndicator = new THREE.Mesh(this.lightIndicatorGeometry, this.lightIndicatorMaterial)
    this.lightIndicator.visible = false
    // 设置初始位置
    this.updateLightIndicatorPosition()

    // 添加到场景
    this.scene.add(this.lightIndicator)
  }

  // 更新光源指示器位置
  updateLightIndicatorPosition() {
    if (this.lightIndicator) {
      this.lightIndicator.position.set(
        this.params.pointLightPosition.x,
        0,
        this.params.pointLightPosition.y,
      )
    }
  }

  // 更新光源指示器颜色
  updateLightIndicatorColor() {
    if (this.lightIndicatorMaterial) {
      this.lightIndicatorMaterial.color.set(this.params.pointLightColor)
    }
  }

  // 更新星球（自转）
  update() {
    if (this.planet) {
      // 星球自转
      this.planet.rotation.y += this.rotation.y * this.time.delta * 0.0005
    }

    // 让光源指示器缓慢旋转，增加视觉效果
    if (this.lightIndicator) {
      this.lightIndicator.rotation.x += this.time.delta * 0.001
      this.lightIndicator.rotation.y += this.time.delta * 0.002
    }
  }

  // 调试控制面板
  debugInit() {
    // 星球控制改由 Planets 统一管理，此处不再创建星球控制面板
  }

  // 更新几何体
  updateGeometry() {
    if (this.planet) {
      this.planet.geometry.dispose()
      this.planet.geometry = new THREE.SphereGeometry(this.radius, 64, 32)
    }
  }

  // 更新位置
  updatePosition() {
    if (this.planet) {
      this.planet.position.set(this.position.x, this.position.y, this.position.z)
      // 同时更新大气层位置
      if (this.atmosphere) {
        this.atmosphere.position.copy(this.planet.position)
      }
    }
  }

  // 设置星球纹理
  setTexture(textureName) {
    if (this.resources.items[textureName]) {
      this.material.uniforms.uTexture.value = this.resources.items[textureName]
      this.textureName = textureName
    }
  }

  // 设置星球位置
  setPosition(x, y, z) {
    this.position.x = x
    this.position.y = y
    this.position.z = z
    this.updatePosition()
  }

  // 设置自转速度
  setRotationSpeed(x, y, z = 0) {
    this.rotation.x = x
    this.rotation.y = y
    this.rotation.z = z
  }

  // 新增光照调节面板
  debuggerInit() {
    // ===== 大气层调节（光照共享，局部仅保留大气颜色） =====
    this.lightingDebugFolder = this.debug.ui.addFolder({
      title: '🌫️ 大气层调节',
      expanded: false,
    })

    // ----- 大气层控制（仅颜色） -----
    const atmosphereFolder = this.lightingDebugFolder.addFolder({
      title: '大气层颜色',
      expanded: false,
    })

    // 大气层颜色
    atmosphereFolder.addBinding(
      this.params,
      'atmosphereDayColor',
      {
        label: '白天大气颜色',
        picker: 'inline',
      },
    ).on('change', ({ value }) => {
      if (this.atmosphereMaterial) {
        this.atmosphereMaterial.uniforms.uAtmosphereDayColor.value = new THREE.Color(value)
      }
    })

    // 黄昏大气颜色
    atmosphereFolder.addBinding(
      this.params,
      'atmosphereTwilightColor',
      {
        label: '黄昏大气颜色',
        picker: 'inline',
      },
    ).on('change', ({ value }) => {
      if (this.atmosphereMaterial) {
        this.atmosphereMaterial.uniforms.uAtmosphereTwilightColor.value = new THREE.Color(value)
      }
    })
  }

  // 与上层共享光照参数同步（由 Planets 统一调控）
  syncLighting(shared) {
    if (!shared)
      return

    // 更新内部参数
    this.params.ambientLight = shared.ambientLight
    this.params.ambientLightIntensity = shared.ambientLightIntensity
    this.params.pointLightColor = shared.pointLightColor
    this.params.pointLightIntensity = shared.pointLightIntensity
    this.params.pointLightPosition = { x: shared.pointLightPosition.x, y: shared.pointLightPosition.y }

    // 同步材质 uniforms
    if (this.material && this.material.uniforms) {
      this.material.uniforms.uAmbientLight.value = new THREE.Color(this.params.ambientLight)
      this.material.uniforms.uAmbientLightIntensity.value = this.params.ambientLightIntensity
      this.material.uniforms.uPointLightColor.value = new THREE.Color(this.params.pointLightColor)
      this.material.uniforms.uPointLightIntensity.value = this.params.pointLightIntensity
      this.material.uniforms.uPointLightPosition.value.set(
        this.params.pointLightPosition.x,
        0,
        this.params.pointLightPosition.y,
      )
    }

    // 同步大气层中的光源位置
    if (this.atmosphereMaterial && this.atmosphereMaterial.uniforms) {
      this.atmosphereMaterial.uniforms.uPointLightPosition.value.set(
        this.params.pointLightPosition.x,
        0,
        this.params.pointLightPosition.y,
      )
    }

    // 更新指示器
    this.updateLightIndicatorPosition()
    this.updateLightIndicatorColor()
  }

  // 应用光照预设
  applyLightingPreset(presetName) {
    switch (presetName) {
      case 'default':
        this.params.ambientLight = '#d2b9e5'
        this.params.ambientLightIntensity = 0.6
        this.params.pointLightColor = '#ffff88'
        this.params.pointLightIntensity = 2.0
        this.params.pointLightPosition = { x: 5.0, y: 3.0 }
        this.params.normalScale = 1.0
        this.params.displacementScale = 0.1
        break

      case 'warm':
        this.params.ambientLight = '#fff5e6'
        this.params.ambientLightIntensity = 0.4
        this.params.pointLightColor = '#ffa500'
        this.params.pointLightIntensity = 3.0
        this.params.pointLightPosition = { x: 4.0, y: 4.0 }
        this.params.normalScale = 1.5
        this.params.displacementScale = 0.15
        break

      case 'cool':
        this.params.ambientLight = '#e6f3ff'
        this.params.ambientLightIntensity = 0.8
        this.params.pointLightColor = '#87ceeb'
        this.params.pointLightIntensity = 2.5
        this.params.pointLightPosition = { x: -3.0, y: 2.0 }
        this.params.normalScale = 0.8
        this.params.displacementScale = 0.05
        break

      case 'bright':
        this.params.ambientLight = '#ffffff'
        this.params.ambientLightIntensity = 1.0
        this.params.pointLightColor = '#ffffff'
        this.params.pointLightIntensity = 4.0
        this.params.pointLightPosition = { x: 0.0, y: 6.0 }
        this.params.normalScale = 2.0
        this.params.displacementScale = 0.2
        break

      case 'soft':
        this.params.ambientLight = '#f0f0f0'
        this.params.ambientLightIntensity = 1.2
        this.params.pointLightColor = '#ffe4e1'
        this.params.pointLightIntensity = 1.5
        this.params.pointLightPosition = { x: 2.0, y: 2.0 }
        this.params.normalScale = 0.5
        this.params.displacementScale = 0.03
        break

      case 'dramatic':
        this.params.ambientLight = '#1a1a2e'
        this.params.ambientLightIntensity = 0.2
        this.params.pointLightColor = '#ff6b6b'
        this.params.pointLightIntensity = 5.0
        this.params.pointLightPosition = { x: -5.0, y: 1.0 }
        this.params.normalScale = 2.5
        this.params.displacementScale = 0.25
        break
    }

    // 更新所有 uniforms
    this.material.uniforms.uAmbientLight.value = new THREE.Color(this.params.ambientLight)
    this.material.uniforms.uAmbientLightIntensity.value = this.params.ambientLightIntensity
    this.material.uniforms.uPointLightColor.value = new THREE.Color(this.params.pointLightColor)
    this.material.uniforms.uPointLightIntensity.value = this.params.pointLightIntensity
    this.material.uniforms.uPointLightPosition.value.set(
      this.params.pointLightPosition.x,
      0,
      this.params.pointLightPosition.y,
    )

    // 更新贴图强度
    this.material.uniforms.uNormalScale.value = this.params.normalScale
    this.material.uniforms.uDisplacementScale.value = this.params.displacementScale

    // 更新大气效果
    if (this.atmosphereMaterial) {
      this.atmosphereMaterial.uniforms.uAtmosphereDayColor.value = new THREE.Color(this.params.atmosphereDayColor)
      this.atmosphereMaterial.uniforms.uAtmosphereTwilightColor.value = new THREE.Color(this.params.atmosphereTwilightColor)
      this.atmosphereMaterial.uniforms.uAtmosphereIntensity.value = this.params.atmosphereIntensity
      this.atmosphereMaterial.uniforms.uAtmosphereThickness.value = this.params.atmosphereThickness
      this.atmosphereMaterial.uniforms.uPointLightPosition.value.set(
        this.params.pointLightPosition.x,
        0,
        this.params.pointLightPosition.y,
      )
    }

    // 更新指示器
    this.updateLightIndicatorPosition()
    this.updateLightIndicatorColor()
  }

  // 销毁星球
  destroy() {
    if (this.planet) {
      this.scene.remove(this.planet)
      this.geometry.dispose()
      this.material.dispose()
    }

    // 清理大气层
    if (this.atmosphere) {
      this.scene.remove(this.atmosphere)
      this.atmosphereGeometry.dispose()
      this.atmosphereMaterial.dispose()
    }

    // 清理光源指示器
    if (this.lightIndicator) {
      this.scene.remove(this.lightIndicator)
      this.lightIndicatorGeometry.dispose()
      this.lightIndicatorMaterial.dispose()
    }
  }

  // 深度合并对象的工具方法
  deepMerge(target, source) {
    const result = { ...target }

    for (const key in source) {
      if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.deepMerge(target[key] || {}, source[key])
      }
      else {
        result[key] = source[key]
      }
    }

    return result
  }
}
