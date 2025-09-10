import api from "./api";

export interface AuthResponse {
  token: string;
  email: string;
  fullName: string;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/login", { email, password });
  return res.data;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  city?: string;
  province?: string;
  zipCode?: string;
  description?: string;
  password: string;
}

export async function register(data: RegisterPayload): Promise<void> {
  await api.post("/auth/register", data);
}
