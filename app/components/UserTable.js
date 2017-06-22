var React = require('react');
var PropTypes = React.PropTypes;
var Link = require('react-router').Link;

function UserTableRow(props) {
  return (
    <tr>
      <td>{props.user.name}</td>
      <td>{props.user.email}</td>
      <td>{props.user.addr}</td>
      <td>{props.user.phone}</td>
    </tr>
  )
}

UserTableRow.propTypes = {
  user : PropTypes.object.isRequired
}

function UserTable(props) {
  return (
    <table className='table table-striped'>
      <thead><tr>
        <th className="col-sm-3">Name</th>
        <th className="col-sm-3">Email</th>
        <th className="col-sm-3">Address</th>
        <th className="col-sm-3">PhoneNo</th>
      </tr></thead>
      <tbody>
        {props.users.map(function(user){
          return <UserTableRow key={user.id} user={user}/>;
        })}
      </tbody>
    </table>
  );
}

UserTable.propTypes = {
  users: PropTypes.array.isRequired
}

module.exports = UserTable;
