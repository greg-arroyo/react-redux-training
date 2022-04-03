import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Axios from 'axios';
import { setUsers } from "./actions";
import { UsersList } from "./usersList";

const actionDispatch = (dispatch) => ({
  setUsers: (users) => dispatch(setUsers(users))
});

export function HomePage(props) {
  const {setUsers} = actionDispatch(useDispatch());

  const fetchUsers = async () => {
    const response = await Axios.get('https://reqres.in/api/users').catch((err) => {
      console.log('Error: ', err);
    })
    setUsers(response.data.data);
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
      <UsersList/>
  );
}
