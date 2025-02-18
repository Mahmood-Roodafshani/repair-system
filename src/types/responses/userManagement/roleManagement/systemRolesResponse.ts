export type SystemRolesResponse = {
  label: string;
  id: string | number;
  status?: boolean;
  children?: SystemRolesResponse[];
};
