import { Result } from 'antd'
import React from 'react'

const Page404 = () => {
  return (
    <div 
        style={{
            background:"white",
            padding:"20px",
            width:"50%",
            margin:"15px auto",
            height:"450px",
            borderRadius:"20px",
        }}
    >

    <Result
    status="404"
    title="404"
    
    subTitle="Sorry, the page you visited does not exist."
    
    />
    </div>
  )
}

export default Page404
