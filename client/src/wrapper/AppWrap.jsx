import React from 'react'

import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const AppWrap = (Component, idName, classNames) => function HOC() {
  return (
    <div id={idName} className={`appwrap__container ${classNames}`}>
      <Component />
      <WhatsAppIcon  className='chatbot__icon'/>
    </div>
  )
}

export default AppWrap;