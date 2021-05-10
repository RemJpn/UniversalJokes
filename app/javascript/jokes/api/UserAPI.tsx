interface User {
  authenticated: boolean;
  id: number;
  nickname: string;
  email: string;
  nb_liked: number;
  avatar: string;
}


const getCurrentUser =(setCurrentUser: (user: User) => void): void => {
  const url = '/api/v1/logged_in';
  fetch(url, { credentials: "same-origin" })
    .then(r => r.json())
    .then(setCurrentUser);
}

const updateUser = (user: User, callback: React.Dispatch<React.SetStateAction<User>>): void => {
  const url = `/api/v1/users/${user.id}`;
  const csrfMetaTag: HTMLMetaElement = document.querySelector('meta[name="csrf-token"]');
  const csrfToken = csrfMetaTag.content;
  const body = { user };
  fetch(url, {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken
    },
    credentials: 'same-origin',
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(callback);
}

export {User, getCurrentUser, updateUser}
