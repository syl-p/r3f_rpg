import {useThree} from "@react-three/fiber";
import * as THREE from 'three'
import {useEffect, useRef} from "react";

export default function useTpsCamera(object, offset, lookAt) {
    const cameraRef = useRef()
    const currentPosition = useRef(new THREE.Vector3())
    const currentLookAt = useRef(new THREE.Vector3())
    const { camera } = useThree();

    useEffect(() => {
        cameraRef.current = camera
    }, [camera]);

    function calculateOffset() {
        const idealOffset = offset.clone()
        idealOffset.applyQuaternion(object.current.quaternion)
        idealOffset.add(object.current.position)
        return idealOffset
    }

    function calculateLookAt() {
        const idealLookAt = lookAt.clone()
        idealLookAt.applyQuaternion(object.current.quaternion)
        idealLookAt.add(object.current.position)
        return idealLookAt
    }

    return (delta) => {
        if(!object.current)
            return

        let idealOffset = calculateOffset()
        let idealLookAt = calculateLookAt()

        // const delay = 0.05 // delay
        const delay = 0.5 * delta

        // this.currentPosition.copy(idealOffset)
        // this.currentLookAt.copy((idealLookAt))
        currentPosition.current.lerp(idealOffset, delay)
        currentLookAt.current.lerp(idealLookAt, delay)

        cameraRef.current.position.copy(currentPosition.current)
        cameraRef.current.lookAt(currentLookAt.current)
    }
}
