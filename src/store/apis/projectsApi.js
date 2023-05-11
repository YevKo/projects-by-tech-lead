import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { faker } from '@faker-js/faker';

// DEV ONLY!!!
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const projectsApi = createApi({
  reducerPath: 'projects',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005',
    fetchFn: async (...args) => {
      // REMOVE FOR PRODUCTION
      await pause(1000);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      removeProject: builder.mutation({
        invalidatesTags: (result, error, Project) => {
          return [{ type: 'Project', id: Project.id }];
        },
        query: (Project) => {
          return {
            url: `/projects/${Project.id}`,
            method: 'DELETE',
          };
        },
      }),
      addProject: builder.mutation({
        invalidatesTags: (result, error, user) => {
          return [{ type: 'UsersProjects', id: user.id }];
        },
        query: (user) => {
          return {
            url: '/projects',
            method: 'POST',
            body: {
              userId: user.id,
              title: faker.company.name(),
            },
          };
        },
      }),
      fetchProjects: builder.query({
        providesTags: (result, error, user) => {
          const tags = result.map((Project) => {
            return { type: 'Project', id: Project.id };
          });
          tags.push({ type: 'UsersProjects', id: user.id });
          return tags;
        },
        query: (user) => {
          return {
            url: '/projects',
            params: {
              userId: user.id,
            },
            method: 'GET',
          };
        },
      }),
    };
  },
});

export const {
  useFetchProjectsQuery,
  useAddProjectMutation,
  useRemoveProjectMutation,
} = projectsApi;
export { projectsApi };
