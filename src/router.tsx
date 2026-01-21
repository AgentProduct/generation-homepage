import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ArticleDetail from './pages/ArticleDetail';
import { ArticleService } from './components/articles/ArticleService';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/article/:id',
    element: <ArticleDetail />,
    loader: async ({ params }) => {
      const id = parseInt(params.id as string);
      const article = ArticleService.getArticleById(id);
      if (!article) {
        throw new Response('Article not found', { status: 404 });
      }
      const content = await ArticleService.getArticleContent(article.url);
      return { article, content };
    },
  },
]);

export default router;
