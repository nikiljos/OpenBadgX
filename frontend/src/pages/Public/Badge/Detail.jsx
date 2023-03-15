import React from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import useBackendData from "../../../hooks/useBackendData";

const PublicBadgeDetail = () => {
  const { id } = useParams();
  console.log(id);
  const [apiLoad, apiError, badgeData] = useBackendData(`detail/${id}`, {
    assertions: [{}],
  },true);

  if (apiError) return <Error message={apiError} />;

  if (apiLoad) return <Loading />;

  return (
    <div>
      <h3>Badge Details</h3>
      <div>
        <h4>Badge Title</h4>
        <div>{badgeData.title}</div>
        <h4>Description</h4>
        <div>{badgeData.desc}</div>
        <div className="assert">
          <h5>Assertion Details</h5>
          <div className="name">Awarded to: {badgeData.assertions[0].name}</div>
          <div className="id">Assertion ID: {badgeData.assertions[0]._id}</div>
        </div>
      </div>
    </div>
  );
};

export default PublicBadgeDetail;
