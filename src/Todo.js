import React, {useState, useEffect} from 'react';

const Todo = () => 
{
    // Use the calendar to store all the todo values.
    // Since data will come from the database, set it to null first.
    // setCalendar will be called in two places. 
    // The first one is in the useEffect function which can initialize calendar.
    // The second one is when every time a user submit the form.
    const [calendar, setCalendar] = useState(null);
    
    useEffect( () =>  
    {
        const abortController = new AbortController();

        // Use useEffect to fetch the data from database as soon as the website is loaded.
        async function fetchCalendar() 
        {
            try
            {
                const response = await fetch('http://localhost:8000/objectives', {signal : abortController.signal});
                const data  = await response.json();
                setCalendar(data);
            }
            catch(err)
            {
                if(err.name === 'AbortError') return;
                throw err;
            }
        }

        fetchCalendar();
        return () => abortController.abort();
    }, [calendar]);

    // Three input fields in the form.
    const [todoInput, setTodoInpute] = useState('');
    const [descriptionInput, setDescriptionInput] = useState('');
    const [timeInput, setTimeInput] = useState('');
    function resetInputFields()
    {
        setTodoInpute('');
        setDescriptionInput('');
        setTimeInput('');
    }

    const [isSubmittable, setIsSubmittable] = useState(false);
    useEffect( () =>
    {     
        if(todoInput && descriptionInput && timeInput) setIsSubmittable(true);
    }, [todoInput, descriptionInput, timeInput])

    // Update and display the new todo list every time the form is submitted.
    function handleSubmit(e) 
    {
        e.preventDefault();
        if(!todoInput || !descriptionInput || !timeInput) return;
        
        const newTodo =
        {
            todo: todoInput,
            description: descriptionInput,
            time: timeInput
        }
        postToCalendar(newTodo);

        const newCalendar = [...calendar, newTodo];
        setCalendar(newCalendar);

        resetInputFields();
    }

    async function postToCalendar(newTodo)
    {
        await fetch('http://localhost:8000/objectives', 
        {
            method: 'POST',
            body: JSON.stringify(newTodo),
            headers: {'Content-Type' : 'application/json'}
        })
    }

    async function handleClick(e)
    {
       await fetch(`http://localhost:8000/objectives/${e.target.name}`, {method: 'DELETE'});
       
       const newCalendar = calendar.filter(thing => thing.id !== Number(e.target.name));
       setCalendar(newCalendar);
    }

    return ( 
        <div className="todoSection">
            
            <h2>All Your Todo's</h2>
            <div className="todoHead">
                <div>Todo</div>
                <div>Description</div>
                <div>Time</div>
            </div>

            <form onSubmit={handleSubmit}>
                <fieldset>
                    <div className="todoBody">

                        {calendar && calendar.map( (thing, index) => 
                        (
                            <div className="todoInfo" key={index}>

                                <div>{thing.todo}</div>
                                <div>{thing.description}</div>
                                <div>{thing.time}</div>
                                <button onClick={e => handleClick(e)} name={thing.id}>Delete</button>
                            
                            </div>
                        ))}

                        <div className="inputField">
                            <input type="text" placeholder="Todo" value={todoInput} onChange={e => setTodoInpute(e.target.value)}/>
                            <input type="text" placeholder="Description" value={descriptionInput} onChange={e => setDescriptionInput(e.target.value)}/>
                            <input type="datetime-local" placeholder="Time" value={timeInput} onChange={e => setTimeInput(e.target.value)} id='timeInput'/>
                            { isSubmittable && <button > Submit </button>}
                        </div>
                    </div>
                </fieldset>
            </form>

        </div>
     );
}
 
export default Todo;