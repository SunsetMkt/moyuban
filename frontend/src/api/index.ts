const API_BASE = import.meta.env.VITE_API_BASE || '';

export interface HolidayInfo {
  date: string;
  template: string;
}

export interface MoyuResponse {
  message: string;
  holidays: HolidayInfo[];
}

export const api = {
  async getMoyuMessage(day?: number): Promise<string> {
    const url = day ? `${API_BASE}/api/moyu?day=${day}` : `${API_BASE}/api/moyu`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch moyu message');
    }
    return response.text();
  },

  async generateToken(length: number = 16): Promise<string> {
    const response = await fetch(`${API_BASE}/api/genereate_token?length=${length}`);
    if (!response.ok) {
      throw new Error('Failed to generate token');
    }
    return response.json();
  },
};
