import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ENDPOINTS } from '../constants/endpoints';

export interface AuthResponse {
  type: string;
  token: string;
}

export interface Profile {
  email: string;
  id: string;
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://backend-ashen-seven-22.vercel.app/',
  }),
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: ENDPOINTS.REGISTER,
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation<AuthResponse, { email: string; password: string }>({
      query: (credentials) => ({
        url: ENDPOINTS.LOGIN,
        method: 'POST',
        body: credentials,
      }),
    }),
    getProfile: builder.query<Profile, void>({
      query: () => {
        const token =  localStorage.getItem('token');
        if (!token) return '';
        return {
            url: ENDPOINTS.PROFILE,
            method: "GET",
            authorization: `Bearer ${token}`
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useGetProfileQuery } = apiSlice;