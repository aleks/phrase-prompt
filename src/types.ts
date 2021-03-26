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

export type Key = {
  id: string;
  name: string;
  description: string;
  name_hash: string;
  plural: boolean;
  tags: string[];
  created_at: Date;
  updated_at: Date;
}
