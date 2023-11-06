import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ENDPOINT } from "../../constants/constants";
import Cookies from "js-cookie";

const experiencesQuery = createApi({
  reducerPath: "experiences",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENDPOINT}api/v1`,
  }),
  endpoints: (builder) => ({
    getExperiences: builder.query({
      query: (params) => ({
        method: "GET",
        url: "experiences",
        params,
      }),
      transformResponse: (res) => ({
        experiences: res.data.map((el) => ({ ...el, key: el._id })),
        total: res.pagination.total,
      }),
    }),
    getExperience: builder.mutation({
      query: (id) => ({
        method: "GET",
        url: `experiences/${id}`,
      }),
    }),
    deleteExperiences: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `experiences/${id}`,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }),
    }),
    createExperiences: builder.mutation({
      query: (body) => ({
        method: "POST",
        url: "experiences",
        body,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }),
    }),
    editExperiences: builder.mutation({
      query: ({ id, body }) => ({
        method: "PUT",
        url: `experiences/${id}`,
        body,
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }),
    }),
  }),
});

const { reducer: experiencesReducer, reducerPath: experiencesName } =
  experiencesQuery;

export { experiencesQuery as default, experiencesName, experiencesReducer };

export const {
  useGetExperienceMutation,
  useGetExperiencesQuery,
  useDeleteExperiencesMutation,
  useCreateExperiencesMutation,
  useEditExperiencesMutation,
} = experiencesQuery;
