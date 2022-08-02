import React from "react";
import { formatDistance } from "date-fns";
import confetti from "canvas-confetti";

function StudentItem({ studentItem, setStudents }) {
  const contactID = studentItem["Contact ID"];
  const approval = studentItem["Approval"];
  const isPending = !approval || approval === "Pending" ? true : false;
  const lastActivity = formatDistance(
    new Date(studentItem["Last Activity Date"]),
    new Date(),
    {
      addSuffix: true,
    }
  );
  const approveURL = `https://eo6o5mc8v7trefi.m.pipedream.net?contact_id=${contactID}&approval=Approved`;

  const handleApprove = () => {
    const options = {
      method: "POST",
    };
    fetch(approveURL, options)
      .then(() => {
        console.log("Approved successfully.");
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
        });
        setStudents((prevStudents) => {
          const updatedStudent = { ...studentItem, Approval: "Approved" };
          const indexToUpdate = prevStudents.findIndex(
            (e) => e["Contact ID"] === contactID
          );
          const newStudents = [...prevStudents];
          newStudents.splice(indexToUpdate, 1, updatedStudent);
          return newStudents;
        });
      })
      .catch((error) => console.error(error));
  };

  const keys = Object.keys(studentItem);

  return (
    <tr>
      <td>
        <button
          onClick={() => handleApprove()}
          className="btn btn-primary"
          hidden={isPending ? false : true}
          disabled={isPending ? false : true}
        >
          Approve
        </button>
      </td>
      {keys.length ? (
        keys.map((prop, idx) => {
          if (prop === "Contact ID") {
            return null;
          }
          if (prop === "Last Activity Date") {
            return (
              <td key={idx} className="border text-center">
                {lastActivity}
              </td>
            );
          }
          return (
            <td key={idx} className="border text-center">
              {studentItem[prop] ? studentItem[prop] : "-"}
            </td>
          );
        })
      ) : (
        <></>
      )}
    </tr>
  );
}

export default StudentItem;
