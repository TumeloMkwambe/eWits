import React from 'react';

const LogoutScreen = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '20px',
      zIndex: 9999
    }}>
      <div className="loader" style={{ transform: 'scale(2)' }}></div>
      <p style={{
        fontSize: '24px',
        color: '#333',
        marginTop: '20px',
        fontWeight: '500'
      }}>Logging out...</p>

      <style>{`
        .loader {
          width: 60px;
          aspect-ratio: 1;
          display: flex;
          animation: l8-0 2s infinite steps(1);
        }
        .loader::before,
        .loader::after {
          content: "";
          flex: 1;
          animation: 
            l8-1 1s infinite linear alternate,
            l8-2 2s infinite steps(1) -.5s;
        }
        .loader::after {
          --s: -1,-1;
        }
        @keyframes l8-0 {
          0%  {transform: scaleX(1)  rotate(0deg)}
          50% {transform: scaleX(-1) rotate(-90deg)}
        }
        @keyframes l8-1 {
          0%,
          5%   {transform:scale(var(--s,1)) translate(0px)   perspective(150px) rotateY(0deg) }
          33%  {transform:scale(var(--s,1)) translate(-10px) perspective(150px) rotateX(0deg) }
          66%  {transform:scale(var(--s,1)) translate(-10px) perspective(150px) rotateX(-180deg)}
          95%,
          100% {transform:scale(var(--s,1)) translate(0px)   perspective(150px) rotateX(-180deg)}
        }
        @keyframes l8-2 {
          0%  {background:#f03355}
          50% {background:#ffa516}
        }
      `}</style>
    </div>
  );
};

export default LogoutScreen;