import React from 'react';

const TopicFilter = ({ topics, activeTopics, onToggleTopic }) => {
  return (
    <div className="topic-filter">
      {topics.map((topic) => (
        <button
          key={topic}
          className={`topic-filter-button ${activeTopics.includes(topic) ? 'active' : ''}`}
          onClick={() => onToggleTopic(topic)}
        >
          {topic}
        </button>
      ))}
    </div>
  );
};

export default TopicFilter;
