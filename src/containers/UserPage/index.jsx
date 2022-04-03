import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { setUser } from './actions';
import { createSelector } from 'reselect';
import { makeSelectUser } from './selectors';
import styled from 'styled-components';
import { Pane } from 'evergreen-ui';

const UserContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const UserImage = styled.div`
  width: 15em;
  height: 15em;

  img {
    width: 100%;
    height: 100%;
  }
`;

const UserName = styled.h3`
  font-size: 20px;
  color: #000;
  margin: 0;
`;

const UserEmail = styled.div`
  font-size: 16px;
  color: #353535;
  margin: 0;
`;

const stateSelector = createSelector(makeSelectUser, (user) => ({
  user
}));

const actionDispatch = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user))
});

export function UserPage(props) {
  const {user} = useSelector(stateSelector);
  const {setUser} = actionDispatch(useDispatch());

  const {userId} = useParams();

  const fetchUser = async (id) => {
    const response = await Axios.get(`https://reqres.in/api/users/${id}`).catch((err) => {
      console.log('Error: ', err);
    })

    if (response)
      setUser(response.data.data);
  }

  useEffect(() => {
    if (userId && userId !== '')
      fetchUser(userId);
  }, [userId]);

  if (!user)
    return <div>Loading...</div>

  return (
    <Pane
      is='section'
      background='#e4e4e4'
      border='muted'
      marginX={20}
      marginY={20}
      paddingX={30}
      paddingY={40}>
      <UserContainer>
        <UserWrapper>
          <UserImage>
            <img src={user.avatar}/>
          </UserImage>
          <UserName>
            {user.first_name} {user.last_name}
          </UserName>
          <UserEmail>{user.email}</UserEmail>
        </UserWrapper>
      </UserContainer>
    </Pane>
  );
}
