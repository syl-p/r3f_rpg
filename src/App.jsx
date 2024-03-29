/* eslint-disable react/jsx-no-undef */
import {Canvas} from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Loader from "./components/Loader.jsx"
import {Suspense } from 'react'
import { Perf } from "r3f-perf";
import {ContextProvider} from "./context.jsx";

function App() {
  return <>
    <Suspense fallback={<Loader />}>
      <ContextProvider>
        <div className="h-full w-full absolute top-0 left-0">
          <Canvas
            gl={{ logarithmicDepthBuffer: true, antialias: false }} dpr={[1, 1.5]}
            camera={
              {
                  fov: 70,
                  near: 0.1,
                  far: 300,
                  position: [6, 4, 8]
              }
            }
            shadows
          >
            <color attach="background" args={["#F1EDE8"]} />
            <Experience />
            <Perf />
          </Canvas>
        </div>
      </ContextProvider>
    </Suspense>
  </>
}

export default App
