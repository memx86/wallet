import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const getEditTransaction = createApi({
  reducerPath: "diagramQuery",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://wallet.goit.ua",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().session.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTransactionSummary: builder.query({
      query: (data) => {
        const { month, year } = data;
        return `/api/transactions-summary${
          month && year ? `?month=${month}&year=${year}` : ""
        }`;
      },
    }),
  }),
});

export const { useGetTransactionSummaryQuery } = getTransactionsQuery;
