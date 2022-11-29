import './App.css';
import NavbarTop from './components/Navbar';
import React, { useState } from 'react';
import { Accordion, Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from 'reactstrap';
import Derivadas from './components/Derivadas';
import Integrales from './components/Integrales';
import Ecuaciones from './components/Ecuaciones';
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient()
function App() {
  const [open, setOpen] = useState('1'); 
  const [toggled, setToggled] = useState(false)
  const handleClose=()=> setToggled(false)
  const handleOpen=()=> setToggled(true)

  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App bg-secondary" >

        <NavbarTop />
        <Offcanvas  style={{display:'flex',textAlign:'center'}}  isOpen={toggled} >
          <OffcanvasHeader style={{width:'100%'}} > 
            <br />Ayuda
            
          </OffcanvasHeader>
          
          <OffcanvasBody style={{textAlign:'left'}}>
            <strong>
              Simbolos:
              <ul>
                <li>** ó ^ : Potencia</li>
                <li>* : Multiplicacion</li>
                <li>/ : Division</li>
                <li>sin(x) : seno (funciona con coseno y otras) </li>
                <li>Exp(x) : Es el equivalente de e^x</li>
                <li>log(x) : Logaritmo natural</li>
              </ul>
            </strong>
          </OffcanvasBody>
          <Button className='bg-success' style={{border:'1px white solid' ,borderRadius:25,paddingLeft:2,paddingRight:2, width:100,margin:'auto'}} onClick={handleClose}>Cerrar</Button>
        </Offcanvas>
        
        <Accordion style={{ maxWidth: '80vw', margin: 'auto', marginTop: '5vh' }} open={open} toggle={toggle}>
        <Button
          style={{marginBottom:10}}
          color="primary"
          onClick={handleOpen}
        >
          Ayuda
        </Button>
          <Derivadas />
          <Integrales />
          <Ecuaciones></Ecuaciones>
        </Accordion>

      </div>
    </QueryClientProvider>
  );
}

export default App;
