
import {configureStore} from '@reduxjs/toolkit'
import categorySlice from './category/categorySlice'

const store = configureStore({
    reducer : {
        category : categorySlice, 
    }
})