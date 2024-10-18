import React from 'react';

const ArticleCard = ({ article }) => {
  return (
    <div className="article-card">
      <img src={article.img_url} alt={article.title} className="article-image" />
      <div className="article-content">
        <h2 className="article-title">{article.summary.EN[0]}</h2>
        <div className="article-topics">
          {article.topics.map((topic, index) => (
            <span key={index} className="topic-tag">{topic}</span>
          ))}
        </div>
        <ul className="article-summary">
          <li>{article.summary.EN[1]}</li>
          <li>{article.summary.EN[2]}</li>
        </ul>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more-link">
          Read More
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
