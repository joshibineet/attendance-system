import membersApi from '@/modules/members/GetMembersApi';
import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../api/apiQuery';

export const store = () => {
    return configureStore({
        reducer: {
            baseApi: baseApi.reducer,
            membersApi: membersApi.reducer
        },
        middleware(getDefaultMiddleware) {
            return getDefaultMiddleware().concat(baseApi.middleware)
        },
    })

}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>
// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']