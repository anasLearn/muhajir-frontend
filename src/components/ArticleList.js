import React from 'react';
import ArticleCard from './ArticleCard';

const ArticleList = ({ articles, language }) => {
  return (
    <div className="article-list">
      {articles.map((article, index) => (
        <ArticleCard key={index} article={article} language={language} />
      ))}
    </div>
  );
};

export default ArticleList;
