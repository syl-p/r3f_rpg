import {useEffect, useRef} from "react";
import {Cone} from "@react-three/drei";
import useSeekSteering from "../../hooks/Yuka/SeekSteering.js";
import {useFrame} from "@react-three/fiber";
import * as THREE from "three"

export default function Follower() {
    const [set, update] = useSeekSteering()
    const ref = useRef()

    useEffect(() => {
        set(ref.current, new THREE.Vector3(0, 0, 0))
    }, []);

    useFrame(() => {
        update()
    })

    return (
        <Cone ref={ref}/>
    )
}