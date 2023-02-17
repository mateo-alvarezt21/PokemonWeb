import { createSlice } from "@reduxjs/toolkit";


const nameTrainerSlice = createSlice({
    name: "nameTrainer",
    initialState: "",
    reducers: {
        setNameTrainerGlobal: (state, action) =>{
            return action.payload
        }
    }
})

export default nameTrainerSlice.reducer

export const {setNameTrainerGlobal} = nameTrainerSlice.actions