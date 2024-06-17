import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { PaginatedResponseType } from '@/core/types/reponseTypes';
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
        }),
        overrideExisting: true,
    });

export default membersApi;

