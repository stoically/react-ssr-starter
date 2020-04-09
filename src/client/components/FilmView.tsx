import React from "react";
import { RouteComponentProps } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Root } from "~/generated/schema";

const FILM = gql`
  query Film($id: ID!) {
    film(id: $id) {
      title
      openingCrawl
    }
  }
`;

export function FilmView(
  props: RouteComponentProps<{ id: string }>
): JSX.Element {
  const { id } = props.match.params;
  const { loading, error, data } = useQuery<Root>(FILM, { variables: { id } });

  if (loading) return <div>Loading..</div>;
  if (error) return <div>Error! {error.message}</div>;
  if (!data?.film) return <div>Film not found</div>;

  const { title, openingCrawl } = data.film;
  return (
    <div className="w-3/6 my-6">
      <div className="font-bold text-xl mb-2">{title}</div>
      <div>{openingCrawl}</div>
    </div>
  );
}
