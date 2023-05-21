import {createSlice} from "@reduxjs/toolkit";

const messSlice = createSlice({
    name: "messb",
    initialState: {
        messb: {},
        idToken: {},
        number: "",

    },

    reducers: {
        addMess(state,action) {
            state.messb ={
                id: action.payload.id,
                mess: action.payload.mess,
                pos: action.payload.pos,
            }
        },
        addTokenId(state,action) {
            state.idToken = {
                idApi: action.payload.idApi,
                token: action.payload.token,
            }
        },
        addNumber(state,action) {
            state.number =  
               action.payload
            
        }
        
    },
    
});
export const {addMess,addTokenId,addNumber} = messSlice.actions;
export default messSlice.reducer;
