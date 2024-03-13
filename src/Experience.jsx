/* eslint-disable react/no-unknown-property */
import {useContext, useRef, useState} from "react";
import {ContactShadows, OrbitControls, Sky, Stage, useHelper} from "@react-three/drei";
import * as THREE from "three"
import { DataContext } from "./DataContext";

export default function Experience() {
    const dirLight = useRef()
    useHelper(dirLight, THREE.DirectionalLightHelper, 1)
    const {state} = useContext(DataContext)
    return <>
        <OrbitControls makeDefault />
        <ContactShadows opacity={1} scale={100} blur={0.05} far={0.4} resolution={2048} frames={1} color="#000000"/>
        <Sky />
        <Stage shadows environment="city" castShadow receiveShadow intensity={1} />
    </>
}
