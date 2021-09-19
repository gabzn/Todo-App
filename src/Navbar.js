import {Link} from 'react-router-dom'

function NavBar()
{
    return(
        <nav className="navbar">
            
            <Link to="/" id="header">Todo Web App</Link>
            <div className="links">
                <Link to="/">Home</Link>  
                <Link to="/">About Me</Link> 
            </div>

        </nav>
    )
}

export default NavBar;