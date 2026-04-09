import React from 'react';
import './TeamList.css';

function TeamList({ team }) {
  return (
    <ul className="team-list">
      {team.map((member) => (
        <li key={member.name} className="team-item">
          <strong>{member.name}</strong>
          <span>{member.role}</span>
        </li>
      ))}
    </ul>
  );
}

export default TeamList;