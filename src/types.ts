export type User = {
  id: string;
  username: string;
  name: string;
  email: string;
};

export type Account = {
  id: string;
  name: string;
};

export type Project = {
  id: string;
  name: string;
  slug: string;
  account: Account;
};

export type Branch = {
  base_project_id: string;
  branch_project_id: string;
  name: string;
  state: string;
  created_by: User;
};
