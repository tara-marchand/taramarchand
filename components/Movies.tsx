import { gql, useQuery } from '@apollo/client';
import React from 'react';

export default function Movies(props) {
  const { loading, error, data } = useQuery(gql`
    {
      allMovies(where: { haveWatched: false }) {
        title
      }
    }
  `);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error! ${error.message}</div>;
  }

  if (!data || !data.allMovies) {
    return <div>Could not find movies :(</div>;
  }

  if (data.allMovies.length > 0 && data.allMovies[0].title) {
    return (
      <div>
        Movies!
        <ul>
          {data.allMovies.map((movie, index) => (
            <li key={index}>Title: {movie.title}</li>
          ))}
        </ul>
      </div>
    );
  }
  return <div>Alas, no movies</div>;
}
