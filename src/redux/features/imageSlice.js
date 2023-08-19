import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    imageName: null,
    imageData : null

}
const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers:{
        setImageData : (state, action) => {
            state.imageName = action.payload.imageName;
            state.imageData = action.payload.imageData;
        } ,
        clearImageData: (state, action) => {
            state.imageName = null
            state.imageData = null
        }
    }
})

export const {setImageData, clearImageData} = imageSlice.actions;
export default imageSlice.reducer;

