import React from "react";
import { RouteComponentProps } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Query } from "~/generated/schema";

const COMPANY = gql`
  query Company($id: ID!) {
    company(id: $id) {
      name
      employees {
        id
        firstName
        lastName
      }
    }
  }
`;

export function CompanyView(
  props: RouteComponentProps<{ id: string }>
): JSX.Element {
  const { id } = props.match.params;
  const { loading, error, data } = useQuery<Query>(COMPANY, {
    variables: { id },
  });

  if (loading) return <div>Loading..</div>;
  if (error) return <div>Error! {error.message}</div>;
  if (!data?.company) return <div>Company not found</div>;

  const { name, employees } = data.company;
  return (
    <div className="w-3/6 my-6">
      <div className="font-bold text-2xl mb-2">{name}</div>
      <div>
        <div className="text-xl mb-2">Employees</div>
        {employees?.map((employee) => {
          if (!employee.id) return;
          return (
            <div key={employee.id}>
              {employee.firstName} {employee.lastName}
            </div>
          );
        })}
      </div>
    </div>
  );
}
