import React from 'react';

const Landing = () => {
   return (
      <div style={{ textAlign: 'center' }}>
         <h1>VoteNow</h1>
         <h3>One click community voting</h3>
         <picture>
            <source srcSet="./images/yesorno.webp" />
            <img
               alt="Yes or no"
               style={{
                  width: '90vw',
                  paddingTop: '20px',
                  maxWidth: '800px',
               }}
            />
         </picture>
         <h4>
            Quickly and easily send one-click surveys to thousands of
            subscribers and track their votes and engagement.
         </h4>
      </div>
   );
};

export default Landing;
