import config from './config';

export const fetchArticles = async (page) => {
  try {
    const response = await fetch(`${config.apiUrl}/get-100-articles/?page=${page}`);
    if (!response.ok) {
      if (response.status === 400) {
        return []; // No more articles
      }
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};
