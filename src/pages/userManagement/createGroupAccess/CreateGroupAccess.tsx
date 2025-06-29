// import { TabContext, TabPanel } from '@mui/lab';
// import { Grid, Tab, Tabs, TextField, useTheme } from '@mui/material';
// import { useEffect, useMemo, useState } from 'react';
// import { Helmet } from 'react-helmet-async';
// import { useNavigate } from 'react-router';
// import { toast } from 'react-toastify';
// import { Loader, MyCustomTable, OpGrid, TableRowAction } from 'src/components';
// import { i18n } from 'src/localization';
// import { ConfirmationDialog } from '@/components/form';
// import {
//   getGroupAccessList,
//   getGroupAccessRoles
// } from 'src/services/userManagement/groupAccessService';

// interface System {
//   id: string;
//   name: string;
// }

// interface Group {
//   id: string | number;
//   name: string;
// }

// function CreateGroupAccess() {
//   const [name, setName] = useState<string>('');
//   const [systems, setSystems] = useState<System[]>([]);
//   const [groups, setGroups] = useState<Group[]>([]);
//   const [selectedGroupId, setSelectedGroupId] = useState<string | number>();
//   const [loading, setLoading] = useState(false);
//   const [showConfirmationForRemove, setShowConfirmationForRemove] =
//     useState(false);
//   const navigate = useNavigate();
//   const theme = useTheme();

//   const columns = useMemo(
//     () => [
//       {
//         header: i18n.t('name'),
//         accessorKey: 'name',
//         size: 120
//       }
//     ],
//     []
//   );

//   useEffect(() => {
//     setLoading(true);
//     Promise.all([
//       getGroupAccessList({}),
//       getGroupAccessRoles({ groupId: selectedGroupId || 0 })
//     ])
//       .then((res) => {
//         if (res[0].statusCode === 200) setGroups(res[0].content);
//         if (res[1].statusCode === 200) setSystems(res[1].content);
//       })
//       .finally(() => setLoading(false));
//   }, [selectedGroupId]);

//   return (
//     <>
//       <Helmet>
//         <title>{i18n.t('createGroupAccess').toString()}</title>
//       </Helmet>
//       <Grid display={'flex'} flexDirection={'column'} gap={'10px'}>
//         <TextField
//           sx={{ width: 300 }}
//           onChange={(e) => setName(e.target.value)}
//           label={i18n.t('group_name').toString()}
//         />
//         {systems && (
//           <>
//             <TabContext value={'ROLES'}>
//               <Tabs value={'ROLES'}>
//                 <Tab
//                   sx={{ backgroundColor: theme.colors.secondary.dark }}
//                   value={'ROLES'}
//                   label={i18n.t('roles').toString()}
//                 />
//               </Tabs>
//               <TabPanel
//                 value={'ROLES'}
//                 sx={{
//                   border: `3px solid ${theme.colors.secondary.dark}`,
//                   padding: '5px 5px 100px 5px'
//                 }}
//               >
//                 <Grid display={'flex'} flexDirection={'column'} gap={'5px'}>
//                   {systems.map((system, index) => (
//                     <Grid
//                       key={index}
//                       display={'flex'}
//                       flexDirection={'row'}
//                       justifyContent={'center'}
//                       sx={{
//                         cursor: 'pointer',
//                         padding: '6px',
//                         color: theme.colors.alpha.white[100],
//                         backgroundColor: theme.colors.primary.dark
//                       }}
//                     >
//                       {system.name}
//                     </Grid>
//                   ))}
//                 </Grid>
//               </TabPanel>
//             </TabContext>
//           </>
//         )}
//         {groups && (
//           <MyCustomTable
//             enableRowNumbers={true}
//             enableRowActions={true}
//             enableHiding={false}
//             enableFilters={false}
//             caption={i18n.t('created_groups')}
//             rowActions={({
//               row
//             }: {
//               row: { original: { id: string | number } };
//             }) => (
//               <TableRowAction
//                 onDelete={() => {
//                   setSelectedGroupId(row.original.id);
//                   setShowConfirmationForRemove(true);
//                 }}
//               />
//             )}
//             data={groups}
//             columns={columns}
//           />
//         )}
//         {!loading && (
//           <OpGrid
//             onCreateOrEdit={async () => {
//               if (name?.length < 2) {
//                 toast(i18n.t('group_name_required'), { type: 'error' });
//                 return;
//               }
//               setLoading(true);
//               const res = await createGroupAccess({ id: 0, name });
//               setLoading(false);
//               if (res.statusCode === 200) {
//                 toast(i18n.t('group_created_successfully'), {
//                   type: 'success'
//                 });
//               }
//             }}
//             onClose={() => navigate('/usermanagement')}
//           />
//         )}
//         {loading && <Loader />}
//         <ConfirmationDialog
//           id="remove_modal"
//           open={showConfirmationForRemove}
//           onClose={() => setShowConfirmationForRemove(false)}
//           closeOnEsc={true}
//           dialogTitle={i18n.t('confirm_remove')}
//           dialogOkBtnAction={() => {
//             if (!selectedGroupId) return;
//             setLoading(true);
//             deleteGroupAccess(selectedGroupId.toString())
//               .then((res) => {
//                 if (res.statusCode === 200) {
//                   setGroups(groups.filter((e) => e.id !== selectedGroupId));
//                   toast.success('گروه مورد نظر با موفقیت حذف گردید');
//                 }
//               })
//               .finally(() => setLoading(false));
//           }}
//         />
//       </Grid>
//     </>
//   );
// }

// export default CreateGroupAccess;
