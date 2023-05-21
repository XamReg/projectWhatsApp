import {configureStore} from "@reduxjs/toolkit";
import messReducer from  './messSlice';

export default configureStore({
    reducer: {
        messb: messReducer,
    },
});