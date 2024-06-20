import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { PaginatedResponseType } from '@/core/types/reponseTypes';
import { toast } from 'react-toastify';
import { GetMemberschema } from './GetMembersTypes';

const membersApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['GetMemberschema'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getMembers: builder.query<PaginatedResponseType<GetMemberschema>, number>({
                query: (page = 1) => `${apiPaths.getMembersUrl}?page=${page}`,
                providesTags: (result) =>
                    result
                        ? [
                            ...result.results.map(
                                ({ id }) => ({ type: 'GetMemberschema', id: id } as const)
                            ),
                            { type: 'GetMemberschema', id: 'LIST' },
                        ]
                        : [{ type: 'GetMemberschema', id: 'LIST' }],
                serializeQueryArgs: ({ endpointName }: { endpointName: string }) => {
                    return endpointName;
                },
                forceRefetch({ currentArg, previousArg }) {
                    return currentArg !== previousArg;
                },
                transformResponse: (response: any): PaginatedResponseType<GetMemberschema> => {

                    return response as PaginatedResponseType<GetMemberschema>;
                },
            }),

            createUser: builder.mutation({
                query: (newUser) => ({
                    url: apiPaths.getMembersUrl,
                    method: 'POST',
                    body: newUser,
                }),
                invalidatesTags: ['GetMemberschema'],
            }),

            // Get Member

            getEachMember: builder.query<GetMemberschema, string>({
                query: (id) => `${apiPaths.getMembersUrl}${id}`,
                serializeQueryArgs: ({ queryArgs, endpointName }) => {
                    return endpointName + queryArgs;
                },
                providesTags: (result, error, ref_id) => {
                    return [{ type: 'GetMemberschema', id: ref_id }];
                },
                transformResponse: (response: any) => {
                    console.log(" get each member response", response);
                    return response
                }
            }),

            // Update Member

            updateMember: builder.mutation<GetMemberschema, Partial<GetMemberschema>>({
                query: ({ ref_id, ...payload }) => {
                    console.log(payload)
                    return ({
                        url: `${apiPaths.getMembersUrl}${payload.id}/`,
                        method: 'PATCH',
                        body: payload,
                    })
                },
                invalidatesTags: (result, error, { ref_id }) => [
                    { type: 'GetMemberschema', id: ref_id },
                ],
                transformResponse: (response) => {
                    return response as GetMemberschema;
                },
            }),

            // Delete Member

            deleteMember: builder.mutation<GetMemberschema, number>({
                query(id) {
                    return {
                        url: `${apiPaths.getMembersUrl}${id}/`,
                        method: 'DELETE',
                    };
                },
                async onQueryStarted(payload, { queryFulfilled }) {
                    try {
                        await queryFulfilled;
                        toast.success('user deleted.');
                    } catch (err) {
                        toast.error('Failed deleting user.');
                    }
                },
                invalidatesTags: (result, error, id) => [{ type: 'GetMemberschema', id }],

            }),
        }),
        overrideExisting: true,
    });

export default membersApi;
export const { useGetMembersQuery, useCreateUserMutation, useGetEachMemberQuery, useDeleteMemberMutation, useUpdateMemberMutation, } = membersApi;
