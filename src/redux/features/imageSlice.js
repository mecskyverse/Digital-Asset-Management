import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    imageDataIndex: -1,
    imageName: null,
    imageData : null,
    imageDataHistory: [],
    imageFormat:'jpg'

}
const imageSlice = createSlice({
    name: 'image',
    initialState,
    reducers:{
        setImageData : (state, action) => {
             // Clearing the redo history when setting new data
            state.imageDataHistory = state.imageDataHistory.slice(0, state.imageDataIndex + 1);

            state.imageName = action.payload.imageName;
            state.imageData = action.payload.imageData;
            state.imageFormat = action.payload.imageFormat
              // Adding the current state to the history and setting the initial ImageData index as 0
            state.imageDataHistory.push({ imageData: state.imageData });
            state.imageDataIndex = 0;
        } ,
        updateImageData: (state, action) => {
            state.imageData = action.payload;
            state.imageDataHistory.push({imageData: state.imageData })
            state.imageDataIndex++;
          },
        clearImageData: (state) => {
            state.imageName = null
            state.imageData = null
            state.imageDataIndex = -1;
            state.imageDataHistory = [];
        },
        undoImageData: (state) => {
            if(state.imageDataIndex > 0){
                state.imageDataIndex--;
                const {imageData} = state.imageDataHistory[state.imageDataIndex];
                state.imageData = imageData;
            }
        },
        redoImageData:(state) => {
            if(state.imageDataIndex< state.imageDataHistory.length -1 ){
                state.imageDataIndex++;
                const {imageData} =  state.imageDataHistory[state.imageDataIndex];
                state.imageData = imageData
            }
        },
    },
})

export const {setImageData, updateImageData, clearImageData, undoImageData, redoImageData} = imageSlice.actions;
export default imageSlice.reducer;

