/* eslint-disable react/jsx-no-undef */
import {Canvas} from "@react-three/fiber";
import Experience from "./Experience.jsx";
import Loader from "./components/Loader.jsx"
import {Suspense } from 'react'
import { Perf } from "r3f-perf";
import { DataContextProvider } from "./DataContext.jsx";

function App() {
  return <>
    <Suspense fallback={<Loader />}>
      <DataContextProvider>
        <div className="h-full w-full absolute top-0 left-0">
          <Canvas
            gl={{ logarithmicDepthBuffer: true, antialias: false }} dpr={[1, 1.5]}
            camera={
              {
                  fov: 70,
                  near: 0.1,
                  far: 300,
                  position: [0, 13, 0]
              }
            }
            shadows
          >
            <color attach="background" args={["#F1EDE8"]} />
            <Experience />
            <Perf />
          </Canvas>
        </div>
      </DataContextProvider>
    </Suspense>
  </>
}

export default App
