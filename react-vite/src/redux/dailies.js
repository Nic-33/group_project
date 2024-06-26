const SET_DAILIES = 'dailies/setDailies'
const CREATE_DAILIES_FOR_USER = 'dailies/createDailiesForUser'
const UPDATE_DAILIES_FOR_USER = 'dailies/updateDailiesForUser'
const DELETE_DAILY = 'dalies/deleteDaily'

const COMPLETE_DAILY = 'dailies/completeDaily'


const setDailies = (dailies) => ({
    type: SET_DAILIES,
    payload: dailies
});

const createDailies = (dailies) => ({
    type: CREATE_DAILIES_FOR_USER,
    payload: dailies
});

const updateDailies = (dailies) => ({
    type: UPDATE_DAILIES_FOR_USER,
    payload: dailies
})

const deleteDailies = (daily_id) => ({
    type: DELETE_DAILY,
    payload: daily_id
})

const completeDaily = (daily_id) => ({
    type: COMPLETE_DAILY,
    payload: daily_id
})





export const thunkGetDailies = () => async (dispatch) => {
    const response = await fetch("/api/daily");
    if (response.ok) {
        const data = await response.json();
        if (data.errors) {
            return;
        }

        dispatch(setDailies(data));
    }
}

export const thunkCreateDailies = (payload) => async (dispatch) => {
    const response = await fetch(`/api/daily`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const daily = await response.json()
        dispatch(createDailies(daily))
    }

}

export const thunkUpdateDailies = (payload, daily_id) => async (dispatch) => {
    const response = await fetch(`/api/daily/${daily_id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const daily = await response.json()
        dispatch(updateDailies(daily))
    }
}

export const thunkDeleteDailies = (daily_id) => async (dispatch) => {
    const response = await fetch(`/api/daily/${daily_id}/delete`, {
        method: 'DELETE'
    });
    dispatch(deleteDailies(daily_id));
    return response;
};

export const thunkCompleteDaily = (daily_id) => async (dispatch) => {
    const response = await fetch(`api/daily/${daily_id}/complete`)
    if (response.ok) {
        const daily = await response.json()
        dispatch(completeDaily(daily))
    }
}

// const SET_HABIT = 'habits/setHabit';
// const REMOVE_HABIT = 'habits.removeHabit'

// const setHabit = (habit) => ({
//     type: SET_HABIT,
//     payload: habit
// });

// const removeHabit = () => ({
//     type: REMOVE_HABIT
// })

const initialState = {}
let obj = {}
function dailyReducer(state = initialState, action) {
    switch (action.type) {
        case SET_DAILIES:
            obj = {}
            action.payload.dailies.forEach(element => {
                obj[element.id] = element;
            });
            return { ...obj }

        case UPDATE_DAILIES_FOR_USER: {
            return {
                ...state, [action.payload.id]: action.payload
            }
        }

        case CREATE_DAILIES_FOR_USER: {
            return {
                ...state, [action.payload.id]: action.payload
            }
        }

        case DELETE_DAILY: {
            obj = { ...state }
            delete obj[action.payload]
            return { ...obj }
        }

        case COMPLETE_DAILY: {
            return { ...state, [action.payload.id]: action.payload }
        }

        default:
            return state;
    }
}



export default dailyReducer;
