import React, { useState, useEffect } from "react";
import StudentCard from "./StudentCard";
// import { data } from "./data";

function ListStudents() {
  const [students, setStudents] = useState(() => []);

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSW5ncmFtIE1hcmluZSIsInBhcnRuZXIiOiJJbmdyYW0gTWFyaW5lIiwiaW5jbHVkZUFzc2Vzc21lbnQiOiJ0cnVlIiwianNvbiI6InRydWUiLCJpYXQiOjE2NTkwNDIwODZ9.L6CpFxkIcHF5UaIGghDSYW4ud8BqsN7uvQINxIM08WE";
    const url = `https://eo54v3d2m8phjma.m.pipedream.net/?token=${token}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setStudents(() => data);
      })
      .catch((error) => console.error(error));

    // TODO: delete this
    // setStudents(() => data);

    return () => {
      setStudents(() => []);
      console.log("clean up");
    };
  }, []);

  return (
    <div
      className="container text-center pt-3"
      style={{ backgroundColor: "#E0E0E0" }}
    >
      <div className="row row-cols-1">
        {students.length ? (
          students.map((student) => {
            return (
              <div key={student["Contact ID"]} className="col">
                <div className="shadow mb-4 bg-body rounded">
                  <StudentCard studentItem={student} />
                </div>
              </div>
            );
          })
        ) : (
          <div className="col"></div>
        )}
      </div>
    </div>
  );
}

export default ListStudents;
