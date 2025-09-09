import api from "./api";

export interface AuthResponse {
  token: string;
  role: string;
  email: string;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>("/auth/login", { email, password });
  return res.data;
}

export async function register(email: string, password: string, role: string): Promise<void> {
  await api.post("/auth/register", { email, password, role });
}
