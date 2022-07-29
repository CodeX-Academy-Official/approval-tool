import React, { useState, useEffect } from "react";
import StudentItem from "./StudentItem";

const PIPEDREAM_TOKEN = process.env.REACT_APP_PIPEDREAM_TOKEN;

function ListStudents() {
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [propertyNames, setPropertyNames] = useState([]);

  useEffect(() => {
    const url = `https://eo54v3d2m8phjma.m.pipedream.net/?token=${PIPEDREAM_TOKEN}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        if (data && data.length && data[0]) {
          setStudents(() => data);
          setPropertyNames(() => Object.getOwnPropertyNames(data[0]));
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
      });

    return () => {
      setStudents(() => []);
      console.log("clean up");
    };
  }, []);

  return (
    <div className="container-fluid">
      {isLoading ? (
        <div className="row mt-3">
          <div className="col d-flex justify-content-center">
            <h1>Loading ... &#x23F3;</h1>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col">
            <div className="table-responsive">
              <table className="table table-striped align-middle border">
                <thead>
                  <tr className="align-middle">
                    {propertyNames.length ? (
                      <th className="border text-center">Approve</th>
                    ) : (
                      <></>
                    )}
                    {propertyNames.length ? (
                      propertyNames.map((prop, idx) => {
                        if (prop === "Contact ID") {
                          return null;
                        }
                        return (
                          <th key={idx} className="border text-center">
                            {prop}
                          </th>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {students.length ? (
                    students.map((student) => {
                      return (
                        <StudentItem
                          key={student["Contact ID"]}
                          studentItem={student}
                        />
                      );
                    })
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListStudents;
