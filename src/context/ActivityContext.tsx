import { createContext, useReducer, Dispatch, useMemo } from "react";
import { activityReducer, initialState, ActivityActions, ActivityState } from "../reducers/activity-reducer";
import { Activity } from "../types";
import { categories } from "../data/categories";


type ActivityProviderProps ={
    children: React.ReactNode
}
type ActivityContextProps = {
    state: ActivityState;
    dispatch: Dispatch<ActivityActions>;
    calorieCosumid: number;
    calorieBurned: number;
    netCalories: number;
    categoryName:  (category : Activity['category']) => string[];
    isEmptyActivities: boolean
};

export const ActivityContext = createContext<ActivityContextProps>({} as ActivityContextProps)

export const ActivityProvider = ({children}: ActivityProviderProps) => {
    const [state, dispatch] = useReducer(activityReducer, initialState)

    const calorieCosumid = useMemo(() => state.activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0) , [state.activities])
    const calorieBurned = useMemo(() => state.activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0) , [state.activities])
    const netCalories = useMemo(() => calorieCosumid - calorieBurned , [state.activities])

    
    const categoryName = useMemo(() => 
        (category : Activity['category']) => categories.map( cat =>  cat.id === category ? cat.name : "")        
    , [state.activities])

    const isEmptyActivities =  useMemo(() => state.activities.length === 0, [state.activities])

    return (
        <ActivityContext.Provider value={{
            state,
            dispatch,
            calorieCosumid,
            calorieBurned,
            netCalories,
            categoryName,
            isEmptyActivities
        }}>
            {children}
        </ActivityContext.Provider>
    )
}