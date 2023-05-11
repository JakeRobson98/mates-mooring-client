import React from 'react';
const BookingTable = ({ data }) => {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>From</th>
          <th>Until</th>
          <th>Price</th>
          <th>Booked by </th>
        </tr>
      </thead>
      <tbody>
        
        {data !== undefined && data.length !== 0 ? data?.map(({ fromDate, toDate, bookedBy, price, id }) => (
          <tr key={id}>
            <td>{new Date(fromDate).toLocaleDateString("en-US")}</td>
            <td>{new Date(toDate).toLocaleDateString("en-US")}</td>
            <td>${price}</td>
            <td>{bookedBy.name}</td>

          </tr>
        )):<></>}
      </tbody>
    </table>
  );
};

export default BookingTable;
