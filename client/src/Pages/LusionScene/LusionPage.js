// src/components/LusionPage.js
import React from 'react';
import LusionScene from '../../components/LusionScene';
import '../../lusionScene.css'
import '../../globals.css'
import Sidebar from '../../components/sidebar';

const LusionPage = () => {
  return (
    <div className='DashboardContainer'>
        <Sidebar/>
        <div className='ContentArea'>
             <h2 className='title-home'>Wind Down For A minute</h2>
                <LusionScene />
          
        </div>

    </div>
    
  );
};

export default LusionPage;
