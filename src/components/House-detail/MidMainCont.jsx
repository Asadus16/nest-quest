import React from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

import HouseInfo from "./ListingDetails";
import BookingForm from "./BookingForm";

const MidMainCont = () => {
  const { id } = useParams();
  const { houseInfo: allHouseInfo, isLoading } = useSelector((store) => ({
    houseInfo: store.houseDetail.houseInfo[id],
    isLoading: store.houseDetail.isLoading,
  }));
  
  return (
    <div className="max-w-7xl w-full px-2 1xsss:px-5 1xz:px-10 1lg:px-20 mx-auto    relative  ">
      <div className="flex w-full 1xz:border-b 1xz:border-grey-dim justify-between">
        <HouseInfo houseInfo={allHouseInfo} isLoading={isLoading}></HouseInfo>
        <BookingForm houseInfo={allHouseInfo}></BookingForm>
      </div>
    </div>
  );
};

export default MidMainCont;
