// // const getcountry=async()=>{
//     const data=await axios.get("https://countriesnow.space/api/v0.1/countries/flag/images");
//     // console.log(data.data.data);
    
//     setcountry(data.data.data);
//     setcity([])
//     setstate([])
// }
// const getstate=async(e)=>{
//     secountry=e
//     const data=await axios.post("https://countriesnow.space/api/v0.1/countries/states",{country:e});
//     // console.log(data.data.data.states);
//     setstate(data.data.data.states);
//     setcity([])

// }
// const getcity=async(e)=>{
//     console.log(secountry);
//     const data=await axios.post("https://countriesnow.space/api/v0.1/countries/state/cities",{country:secountry,state:e});
//     // console.log(data.data.data);
//     setcity(data.data.data);
    
// }
// useEffect(()=>{

//     getcountry()  
// },[])

// {{/* <Select style={{width:"35%",color:'black'}} onChange={(e)=>getstate(e)} >
// {
//     country.map((c,index)=>{
//     return (<Select.Option key={index} value={c.name} label={c.name}>
//         <img src={c.flag} alt={c.name} style={{ width: '20px', marginRight: '18px' }} />
//         {c.name}
//       </Select.Option>)
//     })
// }
// </Select>
// {secountry && <Select key={state}  style={{width:"35%",color:'black'}} onChange={(e)=>getcity(e)} >
// {
//     state.map((c,index)=>{
//     return (<Select.Option key={index} value={c.name} label={c.name}/>)
//     })
// }
// </Select>}
// {city!=""  && <Select key={city} style={{width:"35%",color:'black'}} onChange={(e)=>console.log(e)} >
// {
//     city.map((c,index)=>{
//     return (<Select.Option key={index} value={c} label={c}>
        
//         {c}
//       </Select.Option>)
//     })
// }
// </Select>} */}}