import { useState, useEffect } from "react"
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories"
import { Activity } from "../types"
// import { ActivityActions, ActivityState } from "../reducers/activity-reducer"
import { useActivity } from "../hooks/useActivity"

// type FormProps = {
//     dispatch: Dispatch<ActivityActions>
//     state: ActivityState
// }


const initialState : Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

// const Form = ({dispatch, state} : FormProps) => {
const Form = () => {
    const [activity, setActivity] = useState<Activity>(initialState)

    const { state, dispatch } = useActivity()
    
    useEffect(() => {
      if (state.activeId) {
        console.log("quiere editar, ", state);
        const activityEdit = state.activities.filter( act => act.id === state.activeId)[0]
        setActivity(activityEdit)
        
        
      }
    }, [state.activeId])
    

    const handleChange = (e : React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.id);
        // console.log(e.target.value);
        // Identificar en que campo estoy escribiendo, la idea es convertir estos dos campos a number
        const isNumberField = ['category', 'calories'].includes(e.target.id)
        // console.log('isNumberField', isNumberField)

        setActivity({
            ...activity,
            // [e.target.id] : e.target.value
            [e.target.id] : isNumberField ? +e.target.value : e.target.value

        })       
    }

    const isValidActivity = () => {
        const { name, calories } = activity
        // console.log(name.trim() !== "" && calories > 0)
        return name.trim() !== "" && calories > 0
    }

    
    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({ type: "save-activity", payload: {newActivity : activity}})
        setActivity({
            ...initialState,
            id: uuidv4()
        })   

      console.log("submit...");
      
    }
    

    return (
        <form action=""
            className="space-y-5 bg-white shadow p-10 rounded-lg"
            onSubmit={handleSubmit}
        >
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className="">Categoria:</label>
                <select name="" id="category" className="border border-slate-300 p-2 rounded-lg w-full bg-white" value={activity.category} onChange={(e) => handleChange(e)}>
                    {categories.map(category => (
                        <option value={category.id} key={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="">Actividad:</label>
                <input type="text" placeholder="Ej. Comida, jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta" id="name" className="border border-slate-300 p-2 rounded-lg" value={activity.name} onChange={(e) => handleChange(e)} />
                
            </div>
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="">Calorias:</label>
                <input type="number" placeholder="Calorias. Ej. 300 o 500" id="calories" className="border border-slate-300 p-2 rounded-lg" value={activity.calories} onChange={(e) => handleChange(e)} />
            </div>
            <input type="submit" className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10" disabled={!isValidActivity()} value={activity.category === 1 ? 'Guardar Comida' : 'Guardar ejercicio'} />
        </form>
    )
}

export default Form
