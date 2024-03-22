import {useEffect, useRef} from "react";
import {Cone} from "@react-three/drei";
import useSeekSteering from "../../hooks/Yuka/SeekSteering.js";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three"

export default function Follower({targetRef}) {
    const coneRef = useRef()
    const [update] = useSeekSteering(coneRef, targetRef.current,  new THREE.Vector3(0, 0, 20), [])

    useFrame((state, delta) => {
        update(delta)
    })

    return (
        <Cone castShadow receiveShadow ref={coneRef}/>
    )
}