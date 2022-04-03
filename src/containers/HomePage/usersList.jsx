import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSelector } from 'reselect';
import { makeSelectUsers } from "./selectors";
import styled from 'styled-components';
import { Pane } from 'evergreen-ui';

const UsersContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const UserImage = styled.div`
  width: 7em;
  height: 7em;
  cursor: pointer;

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

const stateSelector = createSelector(makeSelectUsers, (users) => ({
  users
}));

export function UsersList(props) {
  const {users} = useSelector(stateSelector);
  const navigate = useNavigate();
  const isEmptyUsers = !users || (users && users.length === 0);
  if (isEmptyUsers) return null;

  const goToUserPage = (id) => {
    navigate(`/user/${id}`);
  }

  return (
    <Pane
      is='section'
      background='#e4e4e4'
      border='muted'
      marginX={20}
      marginY={20}
      paddingX={30}
      paddingY={40}>
      <UsersContainer>
        {users.map((user, index) => (
          <UserWrapper key={index} onClick={() => goToUserPage(user.id)}>
            <UserImage>
              <img src={user.avatar}/>
            </UserImage>
            <UserName>
              {user.first_name} {user.last_name}
            </UserName>
          </UserWrapper>
        ))}
      </UsersContainer>
    </Pane>
  );
}
