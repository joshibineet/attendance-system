import { apiPaths } from '@/core/api/apiConstants';
import { baseApi } from '@/core/api/apiQuery';
import { PaginatedResponseType } from '@/core/types/reponseTypes';
import { GetMemberschema } from './GetMembersTypes';

const membersApi = baseApi
    .enhanceEndpoints({ addTagTypes: ['GetMemberschema'] })
    .injectEndpoints({
        endpoints: (builder) => ({
            getMembers: builder.query<PaginatedResponseType<GetMemberschema>, void>({
                query: () => `${apiPaths.getMembersUrl}`,
                serializeQueryArgs: ({ endpointName }: { endpointName: string }) => {
                    return endpointName;
                },
                forceRefetch({ currentArg, previousArg }: { currentArg: void | undefined, previousArg: void | undefined }) {
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
