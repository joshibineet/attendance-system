import { apiPaths, setHeaders } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { PaginatedResponseType } from '@/core/types/reponseTypes';
import { toast } from 'react-toastify';
import { GetMemberschema } from './GetMembersTypes';


const membersApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['GetMemberschema'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getMembers: builder.query<PaginatedResponseType<GetMemberschema>, number>({
                query: (page = 1) => `${apiPaths.getMembersUrl}/?page=${page}`,
                providesTags: (result) =>
                    result
                        ? [
                            ...result.results.map(
                                ({ ref_id }) => ({ type: 'GetMemberschema', id: ref_id } as const)
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
                    console.log(response);
                    return response as PaginatedResponseType<GetMemberschema>;
                },
            }),

            // Get each Member

            getEachMember: builder.query<GetMemberschema, string>({
                query: (id) => `${apiPaths.getMembersUrl}${id}/`,
                serializeQueryArgs: ({ queryArgs, endpointName, }) => {
                    return endpointName + queryArgs;
                },

                providesTags: (result, error, ref_id) => {
                    return [{ type: 'GetMemberschema', id: ref_id }];
                },
            }),

            // Update the Member

            updateFlight: builder.mutation<GetMemberschema, Partial<GetMemberschema>>(
                {
                    query: ({ ref_id, ...payload }) => ({
                        url: `${apiPaths.getMembersUrl}/${ref_id}/`,
                        method: 'PATCH',
                        body: payload,
                        prepareHeaders: async (headers: Headers) => await setHeaders(headers),
                    }),
                    invalidatesTags: (result, error, { ref_id }) => [
                        { type: 'GetMemberschema', ref_id },
                    ],
                    async onQueryStarted(payload, { queryFulfilled }) {
                        try {
                            await queryFulfilled;
                            toast.success('Member Updated.');
                        } catch (err) {
                            console.log(err);
                            toast.error('Failed updating a member.');
                        }
                    },
                    transformResponse: (response) => {
                        return response as GetMemberschema;
                    },
                }
            ),

        }),
        overrideExisting: true,
    });

export default membersApi;

