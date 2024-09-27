// pages/index.tsx
import React, { useEffect, useState } from 'react';

type Repo = {
  id: number;
  name: string;
  html_url: string;
  description: string;
};

export default function Home() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRepos() {
      try {
        const res = await fetch('https://api.github.com/users/kevincardona/repos');
        const data = await res.json();
        setRepos(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching repos:', error);
        setLoading(false);
      }
    }
    fetchRepos();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>GitHub Repositories</h1>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              <strong>{repo.name}</strong> - {repo.description || 'No description available'}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

