'use client';
import { useCreateUserMutation } from '@/core/api/apiQuery';
import { useAppDispatch, useAppSelector } from '@/core/redux/clientStore';
import { RootState } from '@/core/redux/store';
import { TextField } from '@/core/ui/karma/src/components';
import Buttons from '@/core/ui/karma/src/components/Buttons';
import FormCard from '@/core/ui/karma/src/components/Form/FormCard';
import FormGroup from '@/core/ui/karma/src/components/Form/FormGroup';
import { nonempty } from '@/core/utils/formUtils';
import membersApi from '@/modules/members/GetMembersApi';
import { useFormik } from 'formik';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { z } from 'zod';
import { toFormikValidate } from 'zod-formik-adapter';

const memberSchema = z.object({
  id: z.number().optional(),
  order: z.number(),
  fullname: z.string().pipe(nonempty),
});

type MemberType = z.infer<typeof memberSchema>;

const EmployeesEachPage = (props: any) => {
  const dispatch = useAppDispatch();
  const userId = useParams();
  console.log(userId.ref_id);
  const [createUser, { isLoading: isCreateUserLoading }] =
    useCreateUserMutation();

  useEffect(() => {
    dispatch(
      membersApi.endpoints.getEachMember.initiate(userId.ref_id as string)
    );
  }, [dispatch]);

  const member = useAppSelector(
    (state: RootState) =>
      state.baseApi.queries[`getEachMember${userId.ref_id}`]?.data as any
  );

  // console.log('member', member);

  const handleSubmit = async (data: MemberType) => {
    try {
      await createUser(data).unwrap();
      alert('User created successfully');
      formik.resetForm();
    } catch (error) {
      console.error('Failed to create user:', error);
      alert('Failed to create user');
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: member?.id ?? undefined,
      order: member?.order ?? 0,
      fullname: member?.fullname ?? '',
    },
    validate: toFormikValidate(memberSchema),
    onSubmit: handleSubmit,
  });

  return (
    <FormCard className="m-4  " onSubmit={formik.handleSubmit}>
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
