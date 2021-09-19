import {Link} from 'react-router-dom'

function NavBar()
{
    return(
        <nav className="navbar">
            
            <h1>Todo App</h1>
            <div className="links">
                <Link to="/"> Home </Link>  
                <Link to="/"> About Me </Link> 
            </div>

        </nav>
    )
}

export default NavBar;