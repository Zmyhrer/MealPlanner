export interface Users {
  id: string;
  email: string;
  name: string;
}

export type UpdateUserInput = {
  email?: string;
  name?: string;
};
