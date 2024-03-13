import { useLoader } from "@react-three/fiber";
import { createContext, useMemo, useState } from "react";
import { FileLoader } from "three";
const CENTER = [2.5438099431228546, 43.15117793128316]

const DataContext = createContext({
    state: null,
    setActive: () => {},
    setTerrainRef: () => {}
})

// eslint-disable-next-line react/prop-types
function DataContextProvider({children}) {
    const [state, setState] = useState({
        active: null,
        data: [],
    })
    
    const value = useMemo(() => {
        return {
            state
        }
    }, [state])

    return <>
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    </>
}

export {DataContext, DataContextProvider}
