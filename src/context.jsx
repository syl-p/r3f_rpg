import { createContext, useContext, useState } from "react";
const CustomizationContext = createContext({})

export const ContextProvider = (props) => {
    const [animationIndex, setAnimationIndex] = useState(0);
    const [animations, setAnimations] = useState([]);

    return <CustomizationContext.Provider value={{
        animationIndex,
        setAnimationIndex,
        animations,
        setAnimations
    }}>
        {props.children}
    </CustomizationContext.Provider>
}

export const useGameContext = () => {
    const context = useContext(CustomizationContext)
    return context
}
