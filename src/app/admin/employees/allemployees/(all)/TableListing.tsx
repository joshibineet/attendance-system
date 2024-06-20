'use client';
import { useAppDispatch } from '@/core/redux/clientStore';
import AlertDialog from '@/core/ui/components/AlertDialog';
import PaginationNav from '@/core/ui/components/Pagination';
import { TableCard, tableStyles } from '@/core/ui/karma/src/components';
import Buttons from '@/core/ui/karma/src/components/Buttons';
import membersApi, {
  useDeleteMemberMutation,
  useGetMembersQuery,
} from '@/modules/members/GetMembersApi';
import { Edit2, Eye, Trash } from 'iconsax-react';
import { useEffect, useState } from 'react';

const TableListing = () => {
  const dispatch = useAppDispatch();
  const [pageIndex, setPageIndex] = useState(0);

  const [modalIsOpen, setIsOpen] = useState(false);
  const [onDelete, setOnDelete] = useState<any>(undefined);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    dispatch(membersApi.endpoints.getMembers.initiate(pageIndex + 1));
  }, [dispatch, pageIndex]);

  const { data: paginatedMembers, isLoading } = useGetMembersQuery(
    pageIndex + 1,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const [deleteMember, { isLoading: isDeleting, isSuccess }] =
    useDeleteMemberMutation();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <AlertDialog
        isOpen={modalIsOpen}
        deleteContent={onDelete?.fullname}
        onClickNo={() => {
          closeModal();
        }}
        onClickYes={async () => {
          if (onDelete) {
            try {
              await deleteMember(onDelete.id).unwrap();
              dispatch(membersApi.endpoints.getMembers.initiate(pageIndex + 1));
            } catch (error) {
              console.error('Failed to delete the member:', error);
            }
          }
          closeModal();
          setOnDelete(undefined);
        }}
      />
      <TableCard
        footer={
          paginatedMembers && paginatedMembers.results.length > 0 ? (
            <PaginationNav
              gotoPage={(value: number) => {
                setPageIndex(value);
              }}
              canPreviousPage={pageIndex > 0}
              canNextPage={
                pageIndex < paginatedMembers.pagination.total_page - 1
              }
              pageCount={paginatedMembers.pagination.total_page}
              pageIndex={paginatedMembers.pagination.current_page - 1}
            />
          ) : (
            <></>
          )
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
                <td className={tableStyles.table_td + ` flex gap-2 w-10`}>
                  <Buttons
                    className="h-8 w-8"
                    kind="secondary"
                    prefix={<Eye size={18} variant="Bold" />}
                  />
                  <Buttons
                    className="h-8 w-8"
                    type="link"
                    href={`/admin/employees/each/${member.id}`}
                    prefix={<Edit2 size={18} variant="Bold" />}
                  />
                  <Buttons
                    className="h-8 w-8"
                    prefix={<Trash size={18} variant="Bold" />}
                    kind="danger"
                    type="button"
                    onClick={() => {
                      setOnDelete(member);
                      openModal();
                    }}
                  />
                </td>
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
