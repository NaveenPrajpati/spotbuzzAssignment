import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'



export interface CounterState {
  value: number
  // userData:{
  //   id:string,
  //   name:string
  //   country:string
  //   score:string
  // }
  playerData:Array<{}>,
  editPlayer:{},
  sortOrder:string
}

const initialState: CounterState = {
  value: 0,
  playerData: [],
  editPlayer: {},
  sortOrder:'id'
}

export const playerSlice = createSlice({
  name: 'playerdata',
  initialState,
  reducers: {
  
    addPlayer: (state,action: PayloadAction<{}>) => {
      state.playerData.push(action.payload)
    },
    setPlayerData: (state, action: PayloadAction<[]>) => {
     
      state.playerData = action.payload
    },
    setEditPlayer:(state,action)=>{
      state.editPlayer=action.payload
    },
    setSortOrder:(state,action)=>{
      state.sortOrder=action.payload
    }
  },
 
})

// Action creators are generated for each case reducer function
export const {  addPlayer, setPlayerData, setEditPlayer,setSortOrder } = playerSlice.actions

export default playerSlice.reducer