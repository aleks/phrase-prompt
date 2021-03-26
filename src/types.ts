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

export type Locale = {
  id: string;
  name: string;
  code: string;
}

export type Key = {
  id: string;
  name: string;
  description: string;
  name_hash: string;
  plural: boolean;
  tags: string[];
  created_at: Date;
  updated_at: Date;
};

export type Translation = {
  id: string;
  content: string;
  unverified: boolean;
  excluded: boolean;
  key: Key;
  locale: Locale;
  placeholders: string[];
  state: string;
  created_at: Date;
  updated_at: Date;
}
