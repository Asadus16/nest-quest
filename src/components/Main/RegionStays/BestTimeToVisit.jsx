import React from "react";

const BestTimeToVisit = ({ regionName }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const prices = [166, 163, 121, 142, 114, 94, 86, 90, 105, 143, 171, 175];
  const temps = [20, 21, 24, 28, 32, 34, 36, 37, 34, 31, 26, 22];

  return (
    <div className="text-center w-full flex flex-col items-center">
      <h2 className="text-3xl font-semibold mb-10 w-11/12">
        When is the best time to visit {regionName}?
      </h2>

      <div className="overflow-x-auto w-11/12">
        <table className="w-full border border-grey-dim bg-white">
          <thead>
            <tr>
              <th className="text-left p-4 font-semibold border border-grey-dim">
                Month
              </th>
              {months.map((month) => (
                <th
                  key={month}
                  className="p-4 font-semibold border border-grey-dim text-center"
                >
                  {month}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 font-semibold border border-grey-dim">
                Avg. price
              </td>
              {prices.map((price, index) => (
                <td
                  key={index}
                  className="p-4 text-center border border-grey-dim"
                >
                  ${price}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-semibold border border-grey-dim">Avg. temp</td>
              {temps.map((temp, index) => (
                <td key={index} className="p-4 text-center border border-grey-dim">
                  {temp}°C
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BestTimeToVisit;

