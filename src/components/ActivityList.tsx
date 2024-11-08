import { useMemo, Dispatch } from "react"
import { Activity } from "../types"
import { categories } from "../data/categories"
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { ActivityActions } from "../reducers/activity-reducer"


type ActivityListProps = {
    activities: Activity[]
    dispatch: Dispatch<ActivityActions>
}

const ActivityList = ({activities, dispatch} : ActivityListProps) => {

    const categoryName = useMemo(() => 
        (category : Activity['category']) => categories.map( cat =>  cat.id === category ? cat.name : "")        
    , [activities])

    // para que funcione el console.log se debe llamar la variable en algun lado del html
    // const categoryName = useMemo(() => 
    //     (category : Activity['category']) =>      
    //     console.log(category)     
    // , [activities])

    const isEmptyActivities =  useMemo(() => activities.length === 0, [activities])

    // console.log('activities', activities)
    // console.log('categoryName', categoryName(2))
  return (
    <div>
      <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y actividades</h2>
      { isEmptyActivities ? 
      <p className="text-center my-5 ">No hay actividades aún ...</p> :
      <>
      {activities.map(activity => (
        <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between shadow">
            <div className="space-y-2 relative">
                <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold
                ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}                    
                > {categoryName(+activity.category)} </p>
                {/* <p> {activity.category} </p> */}
                <p className="text-2xl font-bold pt-5"> {activity.name} </p>
                <p className="font-black text-4xl text-lime-500"> {activity.calories} {''} 
                    <span>Calorias</span>
                </p>
            </div>
            <div>
                <button onClick={() => dispatch({type:"set-activeId", payload: {id: activity.id}})}>
                    <PencilSquareIcon 
                        className=" h-8 w-8 text-gray-800"
                    />
                </button>

                <button onClick={() => dispatch({type:"delete-activity", payload: {id: activity.id}})}>
                    <XCircleIcon
                        className=" h-8 w-8 text-red-800"
                    />
                </button>
            </div>

        </div>
      ))}
      </>
    }
    </div>
  )
}

export default ActivityList