import { useMemo } from "react"
import { Activity } from "../types"
import CaloriesDisplay from "./CaloriesDisplay"

type CalorieTrackerProps = {
    activities: Activity[]
}

export default function CalorieTracker({activities} : CalorieTrackerProps) {

    const calorieCosumid = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0) , [activities])

    const calorieBurned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0) , [activities])

    const netCalories = useMemo(() => calorieCosumid - calorieBurned , [activities])
  return (
    <>
    <h2 className="text-4xl font-black text-white text-center">Resumen de Calorias</h2>
    <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CaloriesDisplay 
            calorie={calorieCosumid}
            text='Comsumidas'
        />
        <CaloriesDisplay 
            calorie={calorieBurned}
            text='Ejercicio'
        />
        <CaloriesDisplay 
            calorie={netCalories}
            text='Diferencia'
        />
    </div>
    </>
  )
}
