import React, { useState, useEffect } from "react";
import StudentItem from "./StudentItem";
import { useSearchParams } from "react-router-dom";

function ListStudents() {
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [propertyNames, setPropertyNames] = useState([]);

  let [searchParams] = useSearchParams();

  const getStudentsBackground = () => {
    const token = searchParams.get("token");
    if (token) {
      const url = `https://eo54v3d2m8phjma.m.pipedream.net/?token=${token}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length && data[0]) {
            setStudents(() => data);
            setPropertyNames(() => Object.getOwnPropertyNames(data[0]));
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      const url = `https://eo54v3d2m8phjma.m.pipedream.net/?token=${token}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          if (data && data.length && data[0]) {
            setStudents(() => [...data]);
            setPropertyNames(() => Object.getOwnPropertyNames(data[0]));
          }
        })
        .catch((error) => {
          setIsLoading(false);
          console.error(error);
        });
    } else {
      setIsLoading(false);
    }

    return () => {
      setStudents(() => []);
      console.log("clean up");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="row mt-2">
          {students.length ? (
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
                            setStudents={setStudents}
                            getStudentsBackground={getStudentsBackground}
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
          ) : (
            <div className="col d-flex justify-content-center mt-5">
              <h3>Please provide your token at URL to get access.</h3>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ListStudents;
