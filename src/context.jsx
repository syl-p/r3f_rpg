import {createContext, useContext, useMemo, useState} from "react";
const CustomizationContext = createContext({

})

export const ContextProvider = (props) => {
    const [currentAnimation, setAnimation] = useState(0);

    const animation = useMemo(() => {
        return {
            currentAnimation
        }
    }, [currentAnimation])

    return <CustomizationContext.Provider value={{
        animation,
        setAnimation
    }}>
        {props.children}
    </CustomizationContext.Provider>
}

export const useGameContext = () => {
    const context = useContext(CustomizationContext)
    return context
}
