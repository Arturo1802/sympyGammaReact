 import axios from 'axios' 
import React, {  useState } from 'react';
import {
      AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Container, 
  Input, 
} from 'reactstrap'; 
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next' 

const Derivadas = () => {
    const [response, setResponse] = useState('')  
    const submitForm=async(variable,inputE)=>{
        await console.log(axios.post(`http://localhost:8000/derivate/`,{id:`${variable}`,expression:`${variable}`}).then((res)=>{setResponse(res.data); inputE.value=res.data.ans }) ) 
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
        const {derivateinput}=e.target.elements
        let prov=derivateinput.value 
        submitForm(prov,derivateinput)
    }
    
      
  return (
    <AccordionItem>
        <AccordionHeader targetId='1'>
            Derivadas
        </AccordionHeader>
        <AccordionBody accordionId='1'>
            <form onSubmit={handleSubmit}>
                <Input autocomplete="off"  
                    id='derivateinput' 
                    name='derivateinput' 
                    required
                    placeholder='Ingresa la derivada que deseas resolver'/>
                    <br />
                <Button color="primary">
                    Resolver
                </Button> 
            </form> 
            <br />
            <Container className='border bg-secondary ' style={{margin:'auto',padding:5}}>
                 
                {
                    response.result ?  <Latex style={{wordWrap:'break-word', overflow:'hidden'}} >{`$ ${response.result} $`}</Latex> : <div></div>
                }  
            </Container>
        </AccordionBody>
    </AccordionItem>
  )
}

export default Derivadas