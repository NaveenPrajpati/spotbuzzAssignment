import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';


const storeData = createAsyncThunk(
  'storing data',
  // Declare the type your function argument here:
  // async (userId: number) => {
  //   const response = await fetch(`https://reqres.in/api/users/${userId}`)
  //   // Inferred return type: Promise<MyData>
  //   return (await response.json()) 

  // }
   async (value) => {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('my-key', jsonValue);
  }

  
)

export interface CounterState {
  value: number
  // userData:{
  //   id:string,
  //   name:string
  //   country:string
  //   score:string
  // }
  playerData:Array<{}>
}

const initialState: CounterState = {
  value:0,
  playerData:[]
}

export const playerSlice = createSlice({
  name: 'playerdata',
  initialState,
  reducers: {
    deletePlayer: (state,action: PayloadAction<string>) => {
      const data=state.playerData.filter(it=>it.id!=action.payload)
      state.playerData=data
    },
    addPlayer: (state,action: PayloadAction<{}>) => {
      state.playerData.push(action.payload)
    },
    setPlayerData: (state, action: PayloadAction<[]>) => {
      state.playerData = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(storeData.fulfilled, (state, { payload }) => {
      state.playerData.push(payload)
    })
    builder.addCase(storeData.rejected, (state, action) => {
      if (action.payload) {
        // Since we passed in `MyKnownError` to `rejectValue` in `updateUser`, the type information will be available here.
        state.error = action.payload.errorMessage
      } else {
        state.error = action.error
      }
    })
  },
})

// Action creators are generated for each case reducer function
export const {  addPlayer, setPlayerData } = playerSlice.actions

export default playerSlice.reducer