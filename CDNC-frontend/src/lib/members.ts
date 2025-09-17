import api from "./api";

export interface CreateMemberPayload {
  name: string;
  email: string;
  role: string;
  agreeToTerms: boolean;
}

export interface CreateMemberResponse {
  message: string;
  memberId: string;
}

export async function createMember(
  data: CreateMemberPayload
): Promise<CreateMemberResponse> {
  const res = await api.post<CreateMemberResponse>("/members", data);
  return res.data;
}
