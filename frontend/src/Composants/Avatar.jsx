import React from 'react';

// Composant Avatar pour afficher l'avatar de l'utilisateur
function Avatar({ user }) {
  return (
    <div className="user">
      <img src={user.avatarUrl} alt={`${user.name}'s avatar`} />
      <span>{user.name}</span>
    </div>
  );
}

export default Avatar;