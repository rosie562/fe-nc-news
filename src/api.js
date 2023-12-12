import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-fsgh.onrender.com/api",
});

export const getAllArticles = () => {
  return newsApi.get("/articles").then(({ data }) => {
    return data.articles;
  });
};

export const getArticleById = (article_id) => {
  return newsApi.get(`articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getArticleComments = (article_id) => {
  return newsApi.get(`articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
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
    return registeredUser;
  });
};
