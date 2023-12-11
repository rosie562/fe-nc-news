import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://nc-news-fsgh.onrender.com/api",
});

export const getAllArticles = () => {
  return newsApi.get("/articles").then(({ data }) => {
    return data.articles;
  });
};
