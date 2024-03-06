import React from 'react'

export default function NavigationDots({active}) {
  return (
    <div>
      <div className="app__navigation">
        {['wedding_img_0','wedding_img_1','wedding_img_2','wedding_img3'].map((item,index)=>(
            <a
            href={`#`}
            key={item+index}
            className='app__navigation-dot'
            style={active===index? {backgroundColor:`#313bac`} : {}}
            />
        ))}
      </div>
    </div>
  )
}
