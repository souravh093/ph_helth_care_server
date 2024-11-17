type TAdmin = {
  name: string;
  email: string;
  contactNumber: string;
};

export type TAdminUser = {
  password: string;
  admin: TAdmin;
};
