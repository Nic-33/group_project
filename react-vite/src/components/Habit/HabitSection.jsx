import HabitInfo from "./HabitInfo"
import { useDispatch, useSelector } from "react-redux"
import { thunkGetHabits, thunkCreateHabits } from "../../redux/habits"
import { useEffect, useState } from "react"
import { months } from "../../data_utils/months"
import './HabitSection.css'
import CreateHabitForm from "../CreateHabitForm/CreateHabitForm"
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem.jsx";


const HabitSection = () => {
    const dispatch = useDispatch()
    const habitSlice = useSelector(state => state.habits)
    const [habitInput, setHabitInput] = useState('');
    const [positive, setPositive] = useState(true)
    const handleHabitInput = (e) => {
        setHabitInput(e)
    }

    const handleKeyPressEnter = async (e) => {
        if (e.key === 'Enter') {

            const title = habitInput.slice()
            const description = ''
            const difficulty = 1
            const frequency = 'daily'
            const pos_count = 0
            const neg_count = 0
            // const today = new Date(Date.now());
            // const tomorrow = new Date(today);
            // tomorrow.setDate(today.getDate() + 1);
            //
            //
            //
            //

            // const date_to_reset = `${tomorrow.getFullYear()}-${tomorrow.getMonth()+1}-${tomorrow.getDate()+1}`
            const date_to_reset = months.calcTomorrow(months.length)

            // const date_to_reset = new Date(Date.now())
            const obj = { title, description, difficulty, frequency, date_to_reset, pos_count, neg_count }
            setHabitInput('');
            // habitSlice[3] = obj
            // const payload = JSON.stringify(obj)
            await dispatch(thunkCreateHabits(obj))
            //
            //
            // dispatch(thunkCreateHabits(payload))
            //
        }
    }

    useEffect(() => {
        dispatch(thunkGetHabits());
    }, [dispatch])

    return <div className="section_container">
        <h2>Habits</h2>
        <div className="create_button">
            <OpenModalMenuItem
                itemText="Create New Habit"
                modalComponent={<CreateHabitForm />}
            />
        </div>
        <div className="section">

            <input className="quick_input hoverable" type="text" value={habitInput} placeholder="Add a habit" onChange={(e) => handleHabitInput(e.target.value)} onKeyUpCapture={(e) => handleKeyPressEnter(e)}></input>
            {/* <button onClick={handleAddHabitClick}>add habit</button> */}
            <div >
                {Object.keys(habitSlice).map(element => {
                    let progress = () => {
                        if (habitSlice[element].pos_count > habitSlice[element].neg_count) return 'positive'
                        if (habitSlice[element].pos_count < habitSlice[element].neg_count) return 'negative'
                        if (habitSlice[element].pos_count === habitSlice[element].neg_count) return 'neutral'
                    }
                    return (<div key={element}> <HabitInfo info_id={element} progress={progress()} /></div>)
                })}
                {/* {positive ? Object.keys(habitSlice).sort((a,b)=>habitSlice[b].pos_count - habitSlice[a].pos_count).map(element => {
                    return (<div key={element}> <HabitInfo info_id={element} /></div>)
                }):
                Object.keys(habitSlice).sort((a,b)=>habitSlice[b].neg_count - habitSlice[a].neg_count).map(element => {
                    return (<div key={element}> <HabitInfo info_id={element} /></div>)
                })} */}
            </div>
        </div>
    </div>

}
export default HabitSection
