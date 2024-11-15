import { Box, Button, Container, IconButton, List, ListItem, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import EditIcon from '@mui/icons-material/Edit';
import { useRef } from 'react';
import { Margin } from '@mui/icons-material';
// import './src/assets/todo.css'

function TotoList() {
  let [value,setValue]=useState('');
  let[input,setInput]=useState([]);
  let editRef=useRef(null)
  let[toggle,setToggle]=useState({show:false,id:null})


  let getValue=(e)=>{
       setValue(e.target.value.trim())
       console.log(value);
       
  }
  
  let addOrUpdateInput=()=>{
     if(value){ 
         if(toggle.show){
        setInput(input.map((item,index)=>index === toggle.id ? value :item))
        setToggle({show:false,id:null})
      }else{
        setInput([...input,value])
      }
      setValue('');
      console.log(input);}else{
        setToggle({show:true})
      }
        
   
    // setInput(toggle.show ? input.map((item,index)=>{index === toggle.id?value:item},setToggle({show:false,id:null})):setInput([...input,value]))
    
   
  }  

  let deleteInput=(Dindex)=>{
     setInput(input.filter((_,index)=>index!==Dindex))
     console.log(input);
     
  }

  let editInput=(index)=>{
    setValue(input[index])
    setToggle({show:true,id:index})
    editRef.current.focus

  }

  return (
    <Container sx={{padding:'10px',width:'500px', justifyContent:'center', alignContent:'center'}}>
      <Box >
        <TextField variant='outlined' label='search here' sx={{width:'300px', }} value={value} onChange={getValue}/>
        <Button variant='contained' color={toggle.show ?'success':'primary'}sx={{width:'150px',height:'55px'}} onClick={addOrUpdateInput}> {toggle.show ? 'update':'Add Item'}</Button>
      </Box>
      <hr />
    


      <Box sx={input.length>0 &&{border:'1px solid lightgrey',marginTop:'-7px',borderRadius:'10px',boxShadow:'2px 2px 10px 2px '}}>
    
        <List sx={{display:'flex', flexDirection:'column',alignItems:'center',}}>
          {input.map((data,index)=>{
          return (<ListItem
                      key={index}
                      sx={{width:'100%',
                           justifyContent:'space-between',
                      }}>
                        <Box sx={{width:'200px',wordWrap:'break-word'}}>{data}<hr /></Box>
          <Box>
          <Stack direction={'row'} sx={{marginRight:'-12px'}}>
          <Button aria-label='edit' color='primary'startIcon={ <EditIcon/>} variant='contained' onClick={()=>editInput(index)}>Edit</Button>

           <Button aria-label='delete' color='error' startIcon={<DeleteSweepIcon/>} variant='contained' onClick={()=>deleteInput(index)}>Delete</Button>
           
           </Stack>
          </Box>
          </ListItem>)})}
      
        </List>
        
      </Box>

    </Container>
  )
}

export default TotoList