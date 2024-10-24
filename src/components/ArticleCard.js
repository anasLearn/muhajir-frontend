import React from 'react';

const ArticleCard = ({ article, language }) => {
  const summary = article.summary[language] || article.summary.EN;

  return (
    <div className="article-card">
      <img src={article.img_url} alt={summary[0]} className="article-image" />
      <div className="article-content">
        <h2 className="article-title">{summary[0]}</h2>
        <div className="article-topics">
          {article.topics.map((topic, index) => (
            <span key={index} className="topic-tag">{topic}</span>
          ))}
        </div>
        <ul className="article-summary">
          <li>{summary[1]}</li>
          <li>{summary[2]}</li>
        </ul>
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="read-more-link">
          Read More
        </a>
      </div>
    </div>
  );
};

export default ArticleCard;
