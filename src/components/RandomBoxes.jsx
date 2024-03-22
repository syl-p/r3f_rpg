import {Box} from "@react-three/drei";
import {useMemo} from "react";
import * as THREE from "three"
import {RigidBody} from "@react-three/rapier";

export default function RandomBoxes({ numBoxes }) {
    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createRandomPositions(numPositions) {
        const positions = [];
        for (let i = 0; i < numPositions; i++) {
            const position = new THREE.Vector3(
                randomInRange(-10, 10),
                randomInRange(-10, 10),
                randomInRange(-10, 10)
            );
            positions.push(position);
        }
        return positions;
    }

    const positions = useMemo(() => createRandomPositions(numBoxes), [numBoxes]);

    return (
        <>
            {positions.map((position, index) => (
                <RigidBody key={index}>
                    <Box castShadow receiveShadow position={position} color="blue" />
                </RigidBody>
            ))}
        </>
    )
}