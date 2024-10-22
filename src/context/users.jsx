const users = [
    { user: 'jarukit', pass: '1234', role: 'admin', token: 'user' }
  ];
  
  export function verifyUser(user, pass) {
    const userFound = users.find((u) => u.user === user && u.pass === pass);
    return userFound ? { role: userFound.role, token: userFound.token } : null;
  }  