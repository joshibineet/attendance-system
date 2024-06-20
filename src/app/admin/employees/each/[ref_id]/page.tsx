'use client';
import { useAppDispatch } from '@/core/redux/clientStore';
import Buttons from '@/core/ui/karma/src/components/Buttons';
import FormCard from '@/core/ui/karma/src/components/Form/FormCard';
import FormGroup from '@/core/ui/karma/src/components/Form/FormGroup';
import TextField from '@/core/ui/karma/src/components/TextField';
import { nonempty } from '@/core/utils/formUtils';
import {
  useCreateUserMutation,
  useGetEachMemberQuery,
  useUpdateMemberMutation,
} from '@/modules/members/GetMembersApi';
import { useFormik } from 'formik';
import { useParams, useRouter } from 'next/navigation';
import { z } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';

const memberSchema = z.object({
  id: z.number().optional(),
  order: z.number(),
  fullname: z.string().pipe(nonempty),
});

type MemberType = z.infer<typeof memberSchema>;

const EmployeesEachPage = () => {
  const dispatch = useAppDispatch();
  const [updateMember] = useUpdateMemberMutation();
  const userId = useParams();
  const { data: member } = useGetEachMemberQuery(userId.ref_id as string);
  const router = useRouter();
  console.log('userId.ref_id', userId.ref_id);
  const [createUser, { isLoading: isCreateUserLoading }] =
    useCreateUserMutation();

  const handleSubmit = async (data: MemberType) => {
    try {
      await updateMember({ ...data }).unwrap();
      // await createUser(data).unwrap();
      formik.resetForm();
      alert('User Updated successfully');
      router.push('/admin/employees/allemployees/');
    } catch (error) {
      console.error('Failed Update user:', error);
      alert('Failed to Update user');
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: member?.id ?? 0,
      order: member?.order ?? 0,
      fullname: member?.fullname ?? '',
    },
    validate: toFormikValidate(memberSchema),
    onSubmit: handleSubmit,
  });

  return (
    <FormCard className="m-4" onSubmit={formik.handleSubmit}>
      <FormGroup title="General">
        <div className="flex flex-col mb-2">
          <TextField
            id="order"
            type="number"
            label="Order"
            className="flex-1"
            required
            {...formik.getFieldProps('order')}
          />
          {!!formik.errors.order && (
            <div className="text-red-500 text-sm">{formik.errors.order}</div>
          )}
        </div>
        <div className="flex flex-col mb-2">
          <TextField
            id="fullname"
            type="text"
            label="Full Name"
            className="flex-1"
            required
            {...formik.getFieldProps('fullname')}
          />
          {!!formik.errors.fullname && (
            <div className="text-red-500 text-sm">{formik.errors.fullname}</div>
          )}
        </div>
      </FormGroup>
      <div className="flex justify-end gap-2 m-4">
        <Buttons
          text="Submit"
          className="h-8 w-fit"
          type="submit"
          isLoading={isCreateUserLoading}
        />
        <Buttons text="Cancel" className="h-8 w-fit" type="reset" />
      </div>
    </FormCard>
  );
};

export default EmployeesEachPage;
