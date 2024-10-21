import React, { useState, useEffect, useCallback } from 'react';
import './App.scss';
import ArticleList from './components/ArticleList';
import TopicFilter from './components/TopicFilter';
import { fetchArticles } from './api';

function App() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [topics, setTopics] = useState([]);
  const [activeTopics, setActiveTopics] = useState([]);

  const loadArticles = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const newArticles = await fetchArticles(page);
      if (newArticles.length === 0) {
        setHasMore(false);
      } else {
        setArticles(prevArticles => [...prevArticles, ...newArticles]);
        setPage(prevPage => prevPage + 1);
        
        // Extract unique topics from all articles
        const allTopics = new Set(newArticles.flatMap(article => article.topics));
        setTopics(prevTopics => Array.from(new Set([...prevTopics, ...allTopics])));
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setHasMore(false);
    }
    setLoading(false);
  }, [loading, hasMore, page]);

  useEffect(() => {
    loadArticles();
  }, []);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadArticles();
    }
  }, [loadArticles]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleToggleTopic = (topic) => {
    setActiveTopics(prevActiveTopics =>
      prevActiveTopics.includes(topic)
        ? prevActiveTopics.filter(t => t !== topic)
        : [...prevActiveTopics, topic]
    );
  };

  const filteredArticles = articles.filter(article =>
    activeTopics.length === 0 || article.topics.some(topic => activeTopics.includes(topic))
  );

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <img src="/logo.png" alt="Muhajir News Logo" className="logo" />
          <h1>Muhajir News</h1>
        </div>
      </header>
      <div className="sticky-filter">
        <TopicFilter
          topics={topics}
          activeTopics={activeTopics}
          onToggleTopic={handleToggleTopic}
        />
      </div>
      <div className="content-wrapper">
        <aside className="ad-banner left">
          <div className="ad-placeholder">Ad Space</div>
        </aside>
        <main>
          <ArticleList articles={filteredArticles} />
          {loading && <p>Loading...</p>}
          {!hasMore && <p>No more articles</p>}
        </main>
        <aside className="ad-banner right">
          <div className="ad-placeholder">Ad Space</div>
        </aside>
      </div>
    </div>
  );
}

export default App;
