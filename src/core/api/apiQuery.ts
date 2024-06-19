import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiPaths, setHeaders } from './apiConstants';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiPaths.baseUrl,
    prepareHeaders: async (headers) => {
      await setHeaders(headers);
      return headers;
    },
  }),
  tagTypes: [
    'Roles',
    'Permissions',
    'UserPermissions',
    'ContentTypes',
    'Users',
    'Profiles',
  ],
  endpoints: (builder) => ({
    getUsers: builder.query<PaginatedResponseType<GetMemberschema>, number>({
      query: (page = 1) => `${apiPaths.getMembersUrl}?page=${page}`,
      providesTags: ['Users'],
    }),
    createUser: builder.mutation({
      query: (newUser) => ({
        url: apiPaths.getMembersUrl,
        method: 'POST',
        body: newUser,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
  // endpoints: () => { }
});

export const { useGetUsersQuery, useCreateUserMutation } = baseApi;

