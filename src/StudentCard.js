import React from "react";
import { formatDistance } from "date-fns";

function StudentCard({ studentItem }) {
  const contactID = studentItem["Contact ID"];
  const firstName = studentItem["First Name"];
  const lastName = studentItem["Last Name"];
  const email = studentItem["Email"];
  const stage = studentItem["Stage"];
  const program = studentItem["Program"] ? studentItem["Program"] : "none";
  const targetCertification = studentItem["Target Certification"];
  const enrollmentType = studentItem["Enrollment Type"];
  const createdDate = studentItem["Create Date"];
  const created = formatDistance(new Date(createdDate), new Date(), {
    addSuffix: true,
  });
  const lastActivityDate = studentItem["Last Activity Date"];
  const lastActivity = formatDistance(new Date(lastActivityDate), new Date(), {
    addSuffix: true,
  });
  const approveURL = `https://eo6o5mc8v7trefi.m.pipedream.net?contact_id=${contactID}&approval=approved`;

  const handleApprove = () => {
    const options = {
      method: "POST",
    };
    fetch(approveURL, options)
      .then(() => console.log("Approved"))
      .catch((error) => console.error(error));
  };

  return (
    <div className="card">
      <h5 className="card-header">{`${firstName} ${lastName} <${email}>`}</h5>
      <div className="card-body">
        {/* <h5 class="card-title">Card title</h5> */}
        {/* <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
        <p className="card-text">{`Stage: ${stage}`}</p>
        <p className="card-text">{`Program: ${program}`}</p>
        <p className="card-text">
          {`Target Certification: ${targetCertification}`}
        </p>
        <p className="card-text">{`Enrollment Type: ${enrollmentType}`}</p>
        <button onClick={() => handleApprove()} className="btn btn-primary">
          Approve
        </button>
      </div>
      <div className="card-footer text-muted">{`Created: ${created} - Last activity: ${lastActivity}`}</div>
    </div>
  );
}

export default StudentCard;
