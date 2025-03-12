export type SystemRolesResponse = {
  label: string;
  id: string;
  status?: boolean;
  children?: SystemRolesResponse[];
};
