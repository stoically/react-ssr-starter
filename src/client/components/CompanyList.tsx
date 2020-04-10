import React from "react";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Query } from "~/generated/schema";

const ALL_COMPANIES = gql`
  {
    allCompanies {
      id
      name
      industry
      employees {
        id
      }
    }
  }
`;

export function CompanyList(): JSX.Element {
  const { loading, error, data } = useQuery<Query>(ALL_COMPANIES);

  if (loading) return <div>Loading..</div>;
  if (error) return <div>Error! {error.message}</div>;
  if (!data?.allCompanies?.length) return <div>No Companies found</div>;

  const companies = data.allCompanies.map((company) => {
    const { id, name, industry, employees } = company;
    if (!id) return;

    return (
      <div key={id} className="flex flex-col border rounded p-2 m-2">
        <div className="mb-2 font-semibold">
          <Link to={`/company/${id}`}>{name}</Link>
        </div>
        <div className="flex justify-between text-sm">
          <div>Industry: {industry}</div>
          <div>Employees: {employees?.length}</div>
        </div>
      </div>
    );
  });

  return <div className="w-3/6 my-6">{companies}</div>;
}
