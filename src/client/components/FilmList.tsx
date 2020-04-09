import React from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Root } from "~/generated/schema";

const ALL_FILMS = gql`
  {
    allFilms {
      edges {
        node {
          id
          title
          releaseDate
          director
        }
      }
    }
  }
`;

export function FilmList(): JSX.Element {
  const { loading, error, data } = useQuery<Root>(ALL_FILMS);

  if (loading) return <div>Loading..</div>;
  if (error) return <div>Error! {error.message}</div>;
  if (!data?.allFilms?.edges?.length) return <div>No Films found</div>;

  const films = data.allFilms.edges.map((film) => {
    if (!film?.node) return false;

    const { id, title, releaseDate, director } = film.node;
    return (
      <div key={id} className="flex flex-col border rounded p-2 m-2">
        <div className="mb-2 font-semibold">
          <Link to={`/film/${id}`}>{title}</Link>
        </div>
        <div className="flex justify-between text-sm">
          <div>Release Date: {releaseDate}</div>
          <div>Director: {director}</div>
        </div>
      </div>
    );
  });

  return <div className="w-3/6 my-6">{films}</div>;
}
