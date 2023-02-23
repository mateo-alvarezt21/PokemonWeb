import { createSlice } from "@reduxjs/toolkit";


const nameTrainerSlice = createSlice({
    name: "nameTrainer",
    initialState: localStorage.getItem("nameTrainer") ?? "",
    reducers: {
        setNameTrainerGlobal: (state, action) =>{
            localStorage.setItem("nameTrainer", action.payload)
            return action.payload
        },
        LogOut: () =>{
            localStorage.removeItem("nameTrainer")
            return ""
        }
    },
});

export default nameTrainerSlice.reducer

export const {setNameTrainerGlobal, LogOut} = nameTrainerSlice.actions