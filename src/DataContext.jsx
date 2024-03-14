import { createContext, useMemo, useState } from "react";

const DataContext = createContext({
    state: null
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
