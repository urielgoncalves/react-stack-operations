import React, {useState, ChangeEvent, useEffect, useRef, useLayoutEffect} from 'react'
import './styles.css'


const Stack = ()=>{
    const [elements, setElements] = useState<string[]>([]);
    const [empty, setEmpty] = useState('true');
    const [alertMessage, setAlertMessage] = useState('');
    const newElementRef = useRef<HTMLInputElement>(null);
    const [formData, setFormData] = useState({
        newElement: ''
    });

    useLayoutEffect(()=>{
        if(newElementRef.current)
            newElementRef.current.focus()
    },[newElementRef, elements, alertMessage, empty]);

    useEffect(()=>{
        console.log(alertMessage);
        if (alertMessage)
            alert(alertMessage);
    },[alertMessage]);

    useEffect(()=>{
        handleIsEmpty();
    },[elements]);

    function handleInputChange(event:ChangeEvent<HTMLInputElement>){
        const {name, value} = event.target;
        setFormData({ ...formData, [name]:value});
    }

    function handlePush(){
        if (!formData.newElement){
            setAlertMessage('Please enter a value');
            return false;
        }

        if (formData.newElement && elements && elements.length === 5){
            setAlertMessage('Stack was already full');
            return false;
        }

        setElements([...elements, formData.newElement]);
        setFormData({...formData, 'newElement':''});
    }

    function handleIsEmpty(){
        if(!elements || elements.length === 0){
            setEmpty('true');
            return true;
        }
        else{
            setEmpty('false');
            return false;
        }
    }

    function handleIsEmptyButton(){
        if (empty && empty === 'true') alert('Yes, Stack is empty');
        else alert('No, Stack is not empty');
    }

    function handlePeek(){
        if (!handleIsEmpty())
            //setElements(elements.slice(0, elements.length - 1));
            setFormData({...formData, 'newElement':elements[elements.length - 1]});
        else
            setAlertMessage('Operation not allowed');
    }

    return(
        <div id="page-stack">
            <header>
                <h1>Stack Operation</h1>
            </header>
            <main>
                <span className="empty">The stack is empty: {empty}</span>
                <div id="actions">
                    <input type="text" 
                    name="newElement" 
                    id="newElement" 
                    onChange={handleInputChange} 
                    value={formData.newElement} 
                    ref={newElementRef} 
                    tabIndex={-1} />
                    <button type="button" id="btnPush" onClick={()=>handlePush()}>Push</button>
                    <button type="button" id="btnEmpty" onClick={()=>handleIsEmptyButton()}>Empty</button>
                    <button type="button" id="btnPeek" onClick={()=>handlePeek()}>Peek</button>
                </div>
                <ul>
                {
                        elements.map(element=>(
                            <li key={Math.random()}>{element}</li>
                        ))
                }
                 </ul>
            </main>
            <footer></footer>
        </div>
    );
}

export default Stack;