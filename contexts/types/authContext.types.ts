export interface UserInfo {
  email: string | null;
  isStaff: boolean;
  permissions: string[];
}

export interface AuthData {
  token: string;
  user: UserInfo;
}

export interface AuthContextType {
  token: string | null;
  login: (tokenData: {
    token: string;
    user: {
      email: string | null;
      isStaff: boolean;
      userPermissions: { code: string }[];
    };
  }) => void;
  logout: () => void;
  isLoggedIn: boolean;
}
