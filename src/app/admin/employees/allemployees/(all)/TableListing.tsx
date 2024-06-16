'use client';
import { useGetUsersQuery } from '@/core/api/apiQuery';
import PaginationNav from '@/core/ui/components/Pagination';
import { TableCard, tableStyles } from '@/core/ui/karma/src/components';

const TableListing = () => {
  const { data: paginatedMembers, isLoading } = useGetUsersQuery({
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <TableCard
        footer={
          <PaginationNav
            gotoPage={() => {}}
            canPreviousPage={true}
            canNextPage={true}
            pageCount={10}
            pageIndex={1}
          />
        }
      >
        <thead>
          <tr className={tableStyles.table_thead_tr}>
            <th className={`${tableStyles.table_th} w-80`}>ID</th>
            <th className={tableStyles.table_th}>Order</th>
            <th className={tableStyles.table_th}>Full Name</th>
          </tr>
        </thead>
        <tbody>
          {paginatedMembers?.results &&
          Array.isArray(paginatedMembers?.results) &&
          paginatedMembers?.results.length > 0 ? (
            paginatedMembers?.results.map((member) => (
              <tr key={member.id} className={tableStyles.table_tbody_tr}>
                <td className={`${tableStyles.table_td} w-80`}>{member.id}</td>
                <td className={tableStyles.table_td}>{member.order}</td>
                <td className={tableStyles.table_td}>{member.fullname}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No users found</td>
            </tr>
          )}
        </tbody>
      </TableCard>
    </>
  );
};

export default TableListing;
