const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token
    alert('Logged out');
    window.location.href = '/login'; // Redirect to login page
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
