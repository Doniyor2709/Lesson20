import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT } from "../../constants/constants";
import Cookies from "js-cookie";

const educationsQuery = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDPOINT}api/v1`,
  }),
  endpoints: (builder) => ({
    getEducations: builder.query({
      query: (params) => ({
        method: "GET",
        url: "education",
        params,
      }),
      transformResponse: (res) => ({
        educations: res.data.map((el) => ({ ...el, key: el._id })),
        total: res.pagination.total,
      }),
    }),
  }),
});

const {reducer: educationsReducer, reducerPath: educationsName} = educationsQuery;

export {educationsQuery as default, educationsReducer, educationsName}

export const {
    useGetEducationsQuery
} = educationsQuery;