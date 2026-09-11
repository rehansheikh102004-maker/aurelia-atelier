"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export interface GlobeConfig {
  pointSize?: number;
  globeColor?: string;
  showAtmosphere?: boolean;
  atmosphereColor?: string;
  atmosphereAltitude?: number;
  emissive?: string;
  emissiveIntensity?: number;
  shininess?: number;
  polygonColor?: string;
  ambientLight?: string;
  directionalLeftLight?: string;
  directionalTopLight?: string;
  pointLight?: string;
  arcTime?: number;
  arcLength?: number;
  rings?: number;
  maxRings?: number;
  initialPosition?: { lat: number; lng: number };
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

export interface ArcData {
  order?: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt?: number;
  color?: string;
}

interface WorldProps {
  data?: ArcData[];
  globeConfig?: GlobeConfig;
}

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

const DEFAULT_ARCS: ArcData[] = [
  { startLat: 25.2048, startLng: 55.2708, endLat: 51.5074, endLng: -0.1278, color: "#E29B4A" },
  { startLat: 51.5074, startLng: -0.1278, endLat: 40.7128, endLng: -74.006, color: "#F5A642" },
  { startLat: 25.2048, startLng: 55.2708, endLat: 35.6762, endLng: 139.6503, color: "#BDD8E9" },
];

export function World({ data = DEFAULT_ARCS, globeConfig = {} }: WorldProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 260;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = 0.22;
    globeGroup.rotation.y = 1.2;
    scene.add(globeGroup);

    const GLOBE_RADIUS = 85;

    // 1. Central Deep Obsidian Sphere
    const sphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const sphereMat = new THREE.MeshPhongMaterial({
      color: new THREE.Color(globeConfig.globeColor || "#001224"),
      emissive: new THREE.Color(globeConfig.emissive || "#001D39"),
      emissiveIntensity: globeConfig.emissiveIntensity ?? 0.35,
      shininess: globeConfig.shininess ? globeConfig.shininess * 100 : 90,
      transparent: true,
      opacity: 0.98,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphere);

    // 2. Atmospheric Glow Outer Shell
    if (globeConfig.showAtmosphere) {
      const atmoAltitude = globeConfig.atmosphereAltitude || 0.18;
      const atmoGeo = new THREE.SphereGeometry(GLOBE_RADIUS * (1 + atmoAltitude * 0.5), 64, 64);
      const atmoMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(globeConfig.atmosphereColor || "#7BBDE8"),
        wireframe: false,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide,
      });
      const atmoSphere = new THREE.Mesh(atmoGeo, atmoMat);
      globeGroup.add(atmoSphere);
    }

    // 3. Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(
      new THREE.Color(globeConfig.ambientLight || "#49769F"),
      1.2
    );
    scene.add(ambientLight);

    const dirLightLeft = new THREE.DirectionalLight(
      new THREE.Color(globeConfig.directionalLeftLight || "#BDD8E9"),
      1.5
    );
    dirLightLeft.position.set(-200, 100, 150);
    scene.add(dirLightLeft);

    const dirLightTop = new THREE.DirectionalLight(
      new THREE.Color(globeConfig.directionalTopLight || "#E29B4A"),
      2.0
    );
    dirLightTop.position.set(200, 250, 200);
    scene.add(dirLightTop);

    // 4. Country Geometries
    fetch("/data/globe.json")
      .then((res) => res.json())
      .then((geojson) => {
        const polyMat = new THREE.LineBasicMaterial({
          color: new THREE.Color("#49769F"),
          transparent: true,
          opacity: 0.45,
        });

        geojson.features?.forEach((feature: any) => {
          const { geometry } = feature;
          if (!geometry) return;

          const coordinates =
            geometry.type === "Polygon"
              ? [geometry.coordinates]
              : geometry.coordinates;

          coordinates.forEach((poly: any) => {
            poly.forEach((ring: any) => {
              const points: THREE.Vector3[] = [];
              ring.forEach(([lng, lat]: [number, number]) => {
                points.push(latLngToVector3(lat, lng, GLOBE_RADIUS + 0.3));
              });

              if (points.length > 1) {
                const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
                const line = new THREE.Line(lineGeo, polyMat);
                globeGroup.add(line);
              }
            });
          });
        });
      })
      .catch(() => {
        // Procedural latitude/longitude fallback rings
        for (let lat = -60; lat <= 60; lat += 30) {
          const pts: THREE.Vector3[] = [];
          for (let lng = 0; lng <= 360; lng += 10) {
            pts.push(latLngToVector3(lat, lng, GLOBE_RADIUS + 0.3));
          }
          const ringGeo = new THREE.BufferGeometry().setFromPoints(pts);
          const ringMat = new THREE.LineBasicMaterial({
            color: new THREE.Color("#49769F"),
            transparent: true,
            opacity: 0.25,
          });
          globeGroup.add(new THREE.Line(ringGeo, ringMat));
        }
      });

    // 5. Flight Arcs & Laser Beams
    const arcGroup = new THREE.Group();
    globeGroup.add(arcGroup);

    const markerMat = new THREE.MeshBasicMaterial({ color: new THREE.Color("#E29B4A") });

    data.forEach((arc) => {
      const v1 = latLngToVector3(arc.startLat, arc.startLng, GLOBE_RADIUS);
      const v2 = latLngToVector3(arc.endLat, arc.endLng, GLOBE_RADIUS);

      // Start & End markers
      [v1, v2].forEach((pos) => {
        const dotGeo = new THREE.SphereGeometry(1.2, 16, 16);
        const dot = new THREE.Mesh(dotGeo, markerMat);
        dot.position.copy(pos.clone().multiplyScalar(1.005));
        globeGroup.add(dot);

        const ringGeo = new THREE.RingGeometry(1.6, 2.2, 24);
        const ring = new THREE.Mesh(
          ringGeo,
          new THREE.MeshBasicMaterial({
            color: new THREE.Color(arc.color || "#E29B4A"),
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.65,
          })
        );
        ring.position.copy(pos.clone().multiplyScalar(1.006));
        ring.lookAt(new THREE.Vector3(0, 0, 0));
        globeGroup.add(ring);
      });

      // Arc Apex
      const mid = new THREE.Vector3().addVectors(v1, v2).multiplyScalar(0.5);
      const dist = v1.distanceTo(v2);
      const altitude = GLOBE_RADIUS + dist * (arc.arcAlt || 0.35);
      mid.setLength(altitude);

      const curve = new THREE.QuadraticBezierCurve3(v1, mid, v2);
      const points = curve.getPoints(60);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(points);

      const curveMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(arc.color || "#E29B4A"),
        transparent: true,
        opacity: 0.75,
      });

      const line = new THREE.Line(curveGeo, curveMat);
      arcGroup.add(line);
    });

    // 6. Interactive Inertia Drag (Non-locking for page scroll)
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let velX = 0;
    let velY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      velX = dx * 0.005;
      velY = dy * 0.005;
      globeGroup.rotation.y += velX;
      globeGroup.rotation.x += velY;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Visibility-culled Animation Loop
    let animId: number;
    let isVisible = false;

    const animate = () => {
      if (!isVisible) return;

      if (!isDragging) {
        if (globeConfig.autoRotate) {
          globeGroup.rotation.y += 0.002 * (globeConfig.autoRotateSpeed || 0.7);
        }
        velX *= 0.92;
        velY *= 0.92;
        globeGroup.rotation.y += velX;
        globeGroup.rotation.x += velY;
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          cancelAnimationFrame(animId);
          animId = requestAnimationFrame(animate);
        } else {
          cancelAnimationFrame(animId);
        }
      },
      { threshold: 0.05 }
    );

    observer.observe(container);

    const handleResize = () => {
      if (!container) return;
      const nw = container.clientWidth;
      const nh = container.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [data, globeConfig]);

  return (
    <div
      ref={containerRef}
      style={{ touchAction: "pan-y" }}
      className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
    />
  );
}

// Backward-compatible alias
export { World as WorldGlobe };
