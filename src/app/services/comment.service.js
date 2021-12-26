import httpService from './http.service';

const commentEndPoint = 'comment/';

const commentService = {
  get: async (pageId) => {
    const { data } = await httpService.get(commentEndPoint, {
      params: {
        orderBy: `"pageId"`,
        equalTo: `"${pageId}"`,
      },
    });
    return data;
  },

  put: async (payload) => {
    const { data } = await httpService.put(
      commentEndPoint + payload._id,
      payload
    );
    return data;
  },

  delete: async (commentId) => {
    const { data } = await httpService.delete(commentEndPoint + commentId);
    return data;
  },
};

export default commentService;
