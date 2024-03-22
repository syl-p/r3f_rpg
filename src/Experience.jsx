/* eslint-disable react/no-unknown-property */
import {useContext, useRef, useState} from "react";
import {ContactShadows, Grid, KeyboardControls, OrbitControls, Plane, Sky, Stage, useHelper} from "@react-three/drei";
import * as THREE from "three"
import Fox from "./components/Fox.jsx";
import Follower from "./components/npcs/Follower.jsx";
import {Perf} from "r3f-perf";
import {Physics, RigidBody} from "@react-three/rapier";
import RandomBoxes from "./components/RandomBoxes.jsx";

export default function Experience() {
    const player = useRef()
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
                <Sky sunPosition={[100, 20, 100]}/>
                <ambientLight intensity={0.3}/>
                <pointLight castShadow intensity={0.8} position={[100, 100, 100]}/>

                <Physics debug>
                    <Fox scale={0.03} ref={player}/>
                    <Follower targetRef={player}/>
                    <RandomBoxes numBoxes={10}/>

                    <RigidBody type="fixed">
                        {/*<Grid receiveShadow renderOrder={-1} position={[0, 0, 0]} infiniteGrid cellSize={0.6}*/}
                        {/*      cellThickness={0.6} sectionSize={3.3}*/}
                        {/*      sectionThickness={1.5} sectionColor={[0.5, 0.5, 10]} fadeDistance={50}/>*/}
                        <mesh receiveShadow position={[0, 0, 0]} rotation-x={-Math.PI / 2}>
                            <planeGeometry args={[1000, 1000]}/>
                            <meshStandardMaterial color="green"/>
                        </mesh>
                    </RigidBody>
                </Physics>
            {/*<Stage shadows environment="city" castShadow receiveShadow intensity={1}/>*/}
        </KeyboardControls>
        <Perf/>
    </>
}