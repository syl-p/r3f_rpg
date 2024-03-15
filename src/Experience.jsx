/* eslint-disable react/no-unknown-property */
import {useContext, useRef, useState} from "react";
import {ContactShadows, Grid, KeyboardControls, OrbitControls, Sky, Stage, useHelper} from "@react-three/drei";
import * as THREE from "three"
import {Fox} from "./components/Fox.jsx";

export default function Experience() {
    const dirLight = useRef()
    useHelper(dirLight, THREE.DirectionalLightHelper, 1)
    const keyboardMap = [
        { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
        { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
        { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
        { name: 'right', keys: ['ArrowRight', 'KeyD'] },
        { name: 'jump', keys: ['Space'] },
        { name: 'run', keys: ['Shift'] },
    ]
    return <>
        <KeyboardControls map={keyboardMap}>
            <Sky/>
            <Stage shadows environment="city" castShadow receiveShadow intensity={1}>
                <Grid receiveShadow renderOrder={-1} position={[0, 0, 0]} infiniteGrid cellSize={0.6} cellThickness={0.6} sectionSize={3.3}
                      sectionThickness={1.5} sectionColor={[0.5, 0.5, 10]} fadeDistance={50}/>
                <Fox scale={0.03}/>
            </Stage>
        </KeyboardControls>
    </>
}
