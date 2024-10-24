import React, { useState, useEffect, useCallback } from 'react';
import './App.scss';
import ArticleList from './components/ArticleList';
import TopicFilter from './components/TopicFilter';
import LanguageSelector from './components/LanguageSelector';
import { fetchArticles } from './api';

function App() {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [topics, setTopics] = useState([]);
  const [activeTopics, setActiveTopics] = useState([]);
  const [language, setLanguage] = useState('EN');
  const [isScrolled, setIsScrolled] = useState(false);

  const loadArticles = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const newArticles = await fetchArticles(page);
      if (newArticles.length === 0) {
        setHasMore(false);
      } else {
        setArticles((prevArticles) => {
          // Check for duplicates before adding new articles
          const existingIds = new Set(prevArticles.map(article => article.url));
          const uniqueNewArticles = newArticles.filter(article => !existingIds.has(article.url));
          return [...prevArticles, ...uniqueNewArticles];
        });
        setPage((prevPage) => prevPage + 1);
        
        // Update topics
        const newTopics = new Set(topics);
        newArticles.forEach((article) => {
          article.topics.forEach((topic) => newTopics.add(topic));
        });
        setTopics(Array.from(newTopics));
      }
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, topics]);

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Handle infinite scroll
      const scrollPosition = window.innerHeight + document.documentElement.scrollTop;
      const scrollThreshold = document.documentElement.offsetHeight - 100; // Load more when 100px from bottom
      
      if (scrollPosition >= scrollThreshold) {
        loadArticles();
      }
      
      // Handle header shrinking
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadArticles]);

  const handleToggleTopic = (topic) => {
    setActiveTopics((prevTopics) =>
      prevTopics.includes(topic)
        ? prevTopics.filter((t) => t !== topic)
        : [...prevTopics, topic]
    );
  };

  const filteredArticles = articles.filter(
    (article) =>
      activeTopics.length === 0 ||
      article.topics.some((topic) => activeTopics.includes(topic))
  );

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="App">
      <header className={`App-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          <img src="/logo.png" alt="Muhajir News Logo" className="logo" />
          <h1>Muhajir News</h1>
          <LanguageSelector language={language} onLanguageChange={handleLanguageChange} />
        </div>
      </header>
      <div className={`sticky-filter ${isScrolled ? 'scrolled' : ''}`}>
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
          <ArticleList articles={filteredArticles} language={language} />
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
