import React, { useState, useEffect, useCallback } from 'react';
import './App.scss';
import ArticleList from './components/ArticleList';
import { fetchArticles } from './api';

function App() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Muhajir News</h1>
      </header>
      <main>
        <ArticleList articles={articles} />
        {loading && <p>Loading...</p>}
        {!hasMore && <p>No more articles</p>}
      </main>
    </div>
  );
}

export default App;
