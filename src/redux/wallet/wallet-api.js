import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://wallet.goit.ua/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().session.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    register: build.mutation({
      query: (data) => ({ url: "/auth/sign-up", method: "POST", body: data }),
      providesTags: ["User"],
    }),
    login: build.mutation({
      query: (data) => ({ url: "/auth/sign-in", method: "POST", body: data }),
      providesTags: ["User"],
    }),
    logout: build.mutation({
      query: () => ({ url: "/auth/sign-out", method: "DELETE" }),
      invalidatesTags: ["User"],
    }),
    refresh: build.query({
      query: () => "/users/current",
      providesTags: ["User"],
    }),
    getTransactionSummary: build.query({
      query: () => "/transactions",
      providesTags: ["Transaction"],
    }),
  }),
  // refetchOnFocus: true,
  // refetchOnReconnect: true,
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRefreshQuery,
  useGetTransactionSummaryQuery,
} = walletApi;
