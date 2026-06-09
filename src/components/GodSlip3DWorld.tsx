import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float } from "@react-three/drei";
import { Physics, RigidBody, CuboidCollider, RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";
import type { PropBet } from "../data/bets";

interface GodSlip3DWorldProps {
  activeBet: PropBet | null;
  lockedBets: PropBet[];
  onAcceptBet: (bet: PropBet) => void;
  multiplier: number;
}

export default function GodSlip3DWorld({
  activeBet,
  lockedBets,
  onAcceptBet,
  multiplier,
}: GodSlip3DWorldProps) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        shadows
        camera={{ position: [0, 2.5, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#0f172a"]} />
        
        {/* Lights */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[0, 2, 0]} intensity={1.8} color="#00e701" distance={8} decay={2} />
        
        {/* Decorative Grid Floor */}
        <gridHelper args={[20, 20, "#1e293b", "#0f172a"]} position={[0, -1.51, 0]} />

        <Physics gravity={[0, -9.81, 0]}>
          {/* Locker Cage: Holds accepted balls */}
          <LockerCage />

          {/* Locked Balls inside the Cage */}
          {lockedBets.map((bet, index) => (
            <LockedBall key={`${bet.id}-${index}`} index={index} />
          ))}

          {/* Active Bet Ball (only if slip is not full and bet exists) */}
          {activeBet && lockedBets.length < 5 && (
            <BetBall
              bet={activeBet}
              onAccept={() => onAcceptBet(activeBet)}
              setIsDragging={setIsDragging}
              isDragging={isDragging}
            />
          )}
        </Physics>

        {/* Multiplier Display floating above the locker cage */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <Text
            position={[0, 2.2, 0]}
            fontSize={0.4}
            color="#00e701"
            font="https://fonts.gstatic.com/s/jetbrainsmono/v18/tU3oEJQ20S6svyXZ_56CUXxTRCYSL0QxAdfeg5-qAc2Ocw.woff"
            anchorX="center"
            anchorY="middle"
          >
            {multiplier.toFixed(2)}x
          </Text>
        </Float>

        {/* Orbit Controls (disabled while dragging to prevent fight for pointer) */}
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2.1} // Prevent looking below floor
          minPolarAngle={Math.PI / 4}
          enabled={!isDragging}
        />
      </Canvas>
      
      {/* Dynamic Overlay Helper Text (fade out if full or dragging) */}
      {!isDragging && lockedBets.length < 5 && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center pointer-events-none select-none animate-pulse">
          <p className="text-xs font-bold text-slate-400 tracking-[0.2em] uppercase">
            Drag & Flick Bet Ball into the Glass Cage
          </p>
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// Component: LockerCage
// -------------------------------------------------------------
function LockerCage() {
  return (
    <group position={[0, 0, 0]}>
      {/* 3D Visual Glass Box */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[3, 3, 3]} />
        <meshPhysicalMaterial
          transmission={0.9}
          roughness={0.12}
          thickness={1.5}
          ior={1.45}
          color="#1e2c38"
          transparent
          opacity={0.3}
          depthWrite={false}
        />
      </mesh>
      
      {/* Cyberpunk green outer cage wireframe */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.02, 3.02, 3.02]} />
        <meshBasicMaterial color="#00e701" wireframe toneMapped={false} />
      </mesh>

      {/* Physics Colliders - Open top, keeps balls trapped inside */}
      {/* Bottom floor */}
      <CuboidCollider args={[1.5, 0.05, 1.5]} position={[0, -1.45, 0]} restitution={0.6} friction={0.2} />
      {/* Left Wall */}
      <CuboidCollider args={[0.05, 1.5, 1.5]} position={[-1.45, 0, 0]} restitution={0.6} friction={0.1} />
      {/* Right Wall */}
      <CuboidCollider args={[0.05, 1.5, 1.5]} position={[1.45, 0, 0]} restitution={0.6} friction={0.1} />
      {/* Back Wall */}
      <CuboidCollider args={[1.5, 1.5, 0.05]} position={[0, 0, -1.45]} restitution={0.6} friction={0.1} />
      {/* Front Wall */}
      <CuboidCollider args={[1.5, 1.5, 0.05]} position={[0, 0, 1.45]} restitution={0.6} friction={0.1} />
    </group>
  );
}

// -------------------------------------------------------------
// Component: LockedBall (dynamic bouncing balls inside locker)
// -------------------------------------------------------------
interface LockedBallProps {
  index: number;
}
function LockedBall({ index }: LockedBallProps) {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  
  // Random starting offsets so they scatter nicely
  const startPos = useRef<[number, number, number]>([
    (Math.random() - 0.5) * 1.5,
    1.0 + (index * 0.2),
    (Math.random() - 0.5) * 1.5,
  ]);

  // Give a small random initial nudge
  useEffect(() => {
    if (rigidBodyRef.current) {
      rigidBodyRef.current.applyImpulse(
        {
          x: (Math.random() - 0.5) * 0.5,
          y: -0.5,
          z: (Math.random() - 0.5) * 0.5,
        },
        true
      );
    }
  }, []);

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders="ball"
      type="dynamic"
      position={startPos.current}
      restitution={0.65}
      friction={0.3}
    >
      <group>
        {/* Neon green core */}
        <mesh castShadow>
          <sphereGeometry args={[0.26, 32, 32]} />
          <meshStandardMaterial
            color="#00e701"
            roughness={0.15}
            metalness={0.7}
            emissive="#00e701"
            emissiveIntensity={0.25}
          />
        </mesh>
        {/* Wireframe soccer shell overlay */}
        <mesh>
          <sphereGeometry args={[0.262, 16, 16]} />
          <meshBasicMaterial color="#000000" wireframe toneMapped={false} />
        </mesh>
      </group>
    </RigidBody>
  );
}

// -------------------------------------------------------------
// Component: BetBall (active interactive bet ball)
// -------------------------------------------------------------
interface BetBallProps {
  bet: PropBet;
  onAccept: () => void;
  setIsDragging: (val: boolean) => void;
  isDragging: boolean;
}
function BetBall({ bet, onAccept, setIsDragging, isDragging }: BetBallProps) {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const [bodyType, setBodyType] = useState<"kinematicPosition" | "dynamic">("kinematicPosition");
  
  const startPos = new THREE.Vector3(0, 1.0, 3.8);
  const dragPlaneZ = 3.8;
  const trailRef = useRef<{ pos: THREE.Vector3; time: number }[]>([]);

  // Function to reset the active ball's state
  const resetActiveBall = () => {
    setBodyType("kinematicPosition");
    setIsDragging(false);
    trailRef.current = [];
    if (rigidBodyRef.current) {
      rigidBodyRef.current.setTranslation(startPos, true);
      rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  };

  // Check state on mount/change
  useEffect(() => {
    resetActiveBall();
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.cursor = "auto";
      }
    };
  }, [bet]);

  // Pointer event handlers
  const handlePointerDown = (e: any) => {
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setIsDragging(true);
    setBodyType("kinematicPosition");
    trailRef.current = [{ pos: startPos.clone(), time: performance.now() }];
  };

  const handlePointerMove = (e: any) => {
    if (!isDragging || bodyType !== "kinematicPosition") return;
    e.stopPropagation();
    
    // Project mouse coordinate to the drag plane
    const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -dragPlaneZ);
    const planeIntersection = new THREE.Vector3();
    e.raycast.ray.intersectPlane(dragPlane, planeIntersection);

    // Limit screen drag boundary
    planeIntersection.x = THREE.MathUtils.clamp(planeIntersection.x, -3.5, 3.5);
    planeIntersection.y = THREE.MathUtils.clamp(planeIntersection.y, -1.0, 4.0);

    // Keep depth locked
    planeIntersection.z = dragPlaneZ;

    // Save trail for velocity calculation
    trailRef.current.push({ pos: planeIntersection.clone(), time: performance.now() });
    if (trailRef.current.length > 5) trailRef.current.shift();

    if (rigidBodyRef.current) {
      rigidBodyRef.current.setNextKinematicTranslation(planeIntersection);
    }
  };

  const handlePointerUp = (e: any) => {
    if (!isDragging) return;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    setIsDragging(false);

    // Calculate release flick velocity
    let flickVelocity = new THREE.Vector3(0, 0, -5); // Default forwards throw force
    if (trailRef.current.length >= 2) {
      const first = trailRef.current[0];
      const last = trailRef.current[trailRef.current.length - 1];
      const dt = (last.time - first.time) / 1000; // time in seconds
      if (dt > 0) {
        flickVelocity.subVectors(last.pos, first.pos).divideScalar(dt);
        // Force the throw forward (negative Z)
        flickVelocity.z = -Math.max(Math.abs(flickVelocity.y) * 1.5, 6);
      }
    }
    
    // Clamp velocity values to prevent breaking physics
    flickVelocity.clampLength(1, 15);

    // Switch body type to dynamic physics to let it fly
    setBodyType("dynamic");

    // Apply linear and angular velocity in the next frame tick
    setTimeout(() => {
      if (rigidBodyRef.current && bodyType !== "kinematicPosition") {
        rigidBodyRef.current.setLinvel(
          { x: flickVelocity.x, y: flickVelocity.y, z: flickVelocity.z },
          true
        );
        rigidBodyRef.current.setAngvel(
          {
            x: (Math.random() - 0.5) * 10,
            y: (Math.random() - 0.5) * 10,
            z: (Math.random() - 0.5) * 10,
          },
          true
        );
      }
    }, 15);
  };

  // Bounding box frame check (Flick into locker zone)
  useFrame(() => {
    if (bodyType === "dynamic" && rigidBodyRef.current) {
      const pos = rigidBodyRef.current.translation();
      
      // Bounding box dimensions of locker cage: center is [0,0,0], bounds roughly x:[-1.4,1.4] y:[-1.4,1.4] z:[-1.4,1.4]
      const insideCage =
        Math.abs(pos.x) < 1.4 &&
        pos.y < 1.4 &&
        pos.y > -1.4 &&
        Math.abs(pos.z) < 1.4;

      if (insideCage) {
        // Trigger acceptance haptics and state updates
        if (typeof window !== "undefined" && navigator.vibrate) {
          navigator.vibrate(60);
        }
        onAccept();
      } else if (pos.y < -5 || pos.z < -6) {
        // Reset if we fell off the floor or flew behind the cage
        resetActiveBall();
      }
    }
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders="ball"
      type={bodyType}
      position={[startPos.x, startPos.y, startPos.z]}
      restitution={0.6}
      friction={0.2}
    >
      <group
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerOver={() => {
          if (typeof document !== "undefined") document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          if (typeof document !== "undefined") document.body.style.cursor = "auto";
        }}
      >
        {/* Main active ball body */}
        <mesh castShadow>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color={isDragging ? "#1aff1c" : "#ffffff"}
            roughness={0.1}
            metalness={0.8}
            emissive={isDragging ? "#00e701" : "#00e701"}
            emissiveIntensity={isDragging ? 0.75 : 0.4}
          />
        </mesh>
        
        {/* Pentagonal Soccer Shell lines */}
        <mesh>
          <sphereGeometry args={[0.302, 16, 16]} />
          <meshBasicMaterial color="#0f172a" wireframe toneMapped={false} />
        </mesh>
      </group>
    </RigidBody>
  );
}
