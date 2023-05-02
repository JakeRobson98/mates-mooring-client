import React from 'react';
const MyTable = ({ data }) => {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Owner</th>
          <th>Title</th>
          <th>Price</th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
      </thead>
      <tbody>
        
        {data.length !== 0 ? data?.map(({ id, title, user, longitude, latitude, price }) => (
          <tr key={id}>
            <td>{user?.name}</td>
            <td>{title}</td>
            <td>{price}</td>
            <td>{latitude}</td>
            <td>{longitude}</td>
          </tr>
        )):<></>}
      </tbody>
    </table>
  );
};

export default MyTable;
