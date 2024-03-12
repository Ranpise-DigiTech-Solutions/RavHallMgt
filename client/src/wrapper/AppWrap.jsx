import React from 'react'

import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const AppWrap = (Component, idName, classNames) => function HOC() {
  return (
    <div id={idName} className={`appwrap__container ${classNames}`}>
      
      {/* <div className="app__wrapper app__flex"> */}
        <div className="wrapper">
          <Component/>
          {/* adando */}
          {/* <WhatsAppIcon /> */}
        </div>
      {/* </div> */}

    </div>
  )
}

export default AppWrap;