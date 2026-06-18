import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.165.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.165.0/examples/jsm/loaders/GLTFLoader.js";

const canvas = document.getElementById("webgl-canvas");
const stage = document.getElementById("floscas-persistent-stage");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canvas && stage && !reduceMotion) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = false;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0.8, 5);

  const ambient = new THREE.AmbientLight(0xffffff, 0.72);
  const key = new THREE.DirectionalLight(0xdfeee7, 1.1);
  key.position.set(3, 4, 4);
  scene.add(ambient, key);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const clock = new THREE.Clock();
  const loader = new GLTFLoader();
  const textureLoader = new THREE.TextureLoader();
  const coats = ["/textures/cat/default.jpg", "/textures/cat/black.jpg", "/textures/cat/cream.jpg"];
  let coatIndex = 0;
  let cat;
  let mixer;
  let idleAction;
  let pettingAction;
  let fallbackPulse = 0;

  const resize = () => {
    const rect = stage.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    camera.aspect = rect.width / Math.max(1, rect.height);
    camera.updateProjectionMatrix();
  };

  const makeFallbackCat = () => {
    const group = new THREE.Group();
    const material = new THREE.MeshPhysicalMaterial({
      color: 0xd8e3dc,
      roughness: 0.42,
      metalness: 0,
      transmission: 0.3,
      thickness: 0.55,
      transparent: true,
      opacity: 0.78
    });
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.82, 32, 18), material);
    body.scale.set(1.05, 0.72, 0.78);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.46, 32, 18), material);
    head.position.set(0, 0.72, 0.18);
    const earGeo = new THREE.ConeGeometry(0.18, 0.36, 3);
    const leftEar = new THREE.Mesh(earGeo, material);
    const rightEar = leftEar.clone();
    leftEar.position.set(-0.28, 1.08, 0.14);
    rightEar.position.set(0.28, 1.08, 0.14);
    leftEar.rotation.z = 0.16;
    rightEar.rotation.z = -0.16;
    const tail = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.055, 10, 36, Math.PI * 1.18), material);
    tail.position.set(0.72, 0.12, -0.08);
    tail.rotation.set(0.6, 0.2, 1.1);
    group.add(body, head, leftEar, rightEar, tail);
    group.position.y = -0.52;
    group.userData.baseY = -0.52;
    scene.add(group);
    return group;
  };

  const setPointer = (event) => {
    const rect = canvas.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };

  const hitCat = (event) => {
    if (!cat) return false;
    setPointer(event);
    raycaster.setFromCamera(pointer, camera);
    return raycaster.intersectObject(cat, true).length > 0;
  };

  const fitModel = (object) => {
    object.position.set(0, 0, 0);
    object.scale.setScalar(1);
    object.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = 1.72 / maxDim;
    object.scale.setScalar(scale);
    object.updateMatrixWorld(true);

    const fittedBox = new THREE.Box3().setFromObject(object);
    const center = fittedBox.getCenter(new THREE.Vector3());
    object.position.sub(center);
    object.position.y -= 0.08;
    object.userData.baseY = object.position.y;
  };

  const playPetting = () => {
    if (pettingAction && idleAction) {
      pettingAction.reset();
      pettingAction.setLoop(THREE.LoopOnce, 1);
      pettingAction.clampWhenFinished = true;
      idleAction.crossFadeTo(pettingAction.play(), 0.18, false);
      const restore = () => {
        pettingAction.crossFadeTo(idleAction.play(), 0.32, false);
        mixer.removeEventListener("finished", restore);
      };
      mixer.addEventListener("finished", restore);
      return;
    }
    fallbackPulse = 1;
  };

  const switchCoat = () => {
    coatIndex = (coatIndex + 1) % coats.length;
    textureLoader.load(coats[coatIndex], (texture) => {
      texture.flipY = false;
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.encoding = THREE.sRGBEncoding;
      cat?.traverse((object) => {
        if (!object.isMesh || !object.material) return;
        object.material.map = texture;
        object.material.needsUpdate = true;
      });
    }, undefined, () => {
      cat?.traverse((object) => {
        if (!object.isMesh || !object.material) return;
        object.material.color?.offsetHSL?.(0.08, -0.04, 0.04);
        object.material.needsUpdate = true;
      });
    });
  };

  canvas.addEventListener("click", (event) => {
    if (hitCat(event)) playPetting();
  });

  canvas.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    if (hitCat(event)) switchCoat();
  });

  loader.load("/models/cat.glb", (gltf) => {
    cat = gltf.scene;
    fitModel(cat);
    scene.add(cat);
    mixer = new THREE.AnimationMixer(cat);
    const idle = THREE.AnimationClip.findByName(gltf.animations, "idle");
    const petting = THREE.AnimationClip.findByName(gltf.animations, "petting");
    if (idle) idleAction = mixer.clipAction(idle).play();
    if (petting) pettingAction = mixer.clipAction(petting);
  }, undefined, () => {
    cat = makeFallbackCat();
  });

  const animate = () => {
    const delta = clock.getDelta();
    const elapsed = clock.elapsedTime;
    mixer?.update(delta);
    if (cat) {
      const baseY = cat.userData.baseY || 0;
      cat.rotation.y = Math.sin(elapsed * 0.35) * 0.18;
      cat.position.y = baseY + Math.sin(elapsed * 1.2) * 0.018 + fallbackPulse * 0.035;
      fallbackPulse *= 0.9;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  resize();
  window.addEventListener("resize", resize);
  animate();
}
