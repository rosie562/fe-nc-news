import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-fsgh.onrender.com/api",
});

export const getAllArticles = (topicQuery, topic, sort_by, order) => {
  return newsApi
    .get("/articles", {
      params: {
        topicQuery: topicQuery,
        topic: topic,
        sort_by: sort_by,
        order: order,
      },
    })
    .then(({ data }) => {
      return data.articles;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getArticleById = (article_id) => {
  return newsApi
    .get(`articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getArticleComments = (article_id) => {
  return newsApi
    .get(`articles/${article_id}/comments`)
    .then(({ data }) => {
      return data.comments;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const patchArticle = (article_id) => {
  const requestBody = {
    inc_votes: 1,
  };
  return newsApi
    .patch(`articles/${article_id}`, requestBody)
    .then(({ data }) => {
      return data.article;
    });
};

export const getUserByUsername = (existingUser) => {
  return newsApi.get("/users").then(({ data }) => {

    const registeredUser = data.users.filter((user) => {
      return user.username === existingUser;
    });
    if (registeredUser.length === 0) {
      throw new Error("User not found. Use cooljmessy to log in");
    }
    return registeredUser[0];
  });
};

export const getUsers = () => {
  return newsApi.get("/users").then(({ data }) => {
    return data.users;
  });
};


export const postComment = (user, newComment, article_id) => {
  const postBody = {
    username: user.username,
    body: newComment,
  };
  return newsApi
    .post(`articles/${article_id}/comments`, postBody)
    .then(({ data }) => {
      return data.comment;
    });
};

export const deleteComment = (comment_id) => {
  return newsApi.delete(`comments/${comment_id}`);
};

export const getTopics = () => {
  return newsApi.get("/topics").then(({ data }) => {
    return data.topics;
  });
};
