type DecodedToken = {
  exp: number;
  iat: number;
  jti: string;
  onboarding: boolean;
  token_type: string;
  user_id: number;
  username: string;
};

type Entry = {
  id: number;
  site_name: string;
  site_url: string;
  site_image: string;
  email: string;
  password: string;
  username: string;
};

type NewEntry = {
  master_password: string;
  site_name: string;
  site_url: string;
  site_image: string;
  email: string;
  username: string;
  password: string;
  user_id: string;
};

type FormErrors = {
  master_password: string | null;
  site_name: string | null;
  email: string | null;
  password: string | null;
};

type User = {
  token: string;
  user: {
    id: number;
    username: string;
    password: string;
    email: string;
  };
};
