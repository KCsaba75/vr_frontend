const Navbar = () => {
  return (
    <nav>
        <ul className = "menubar">
            <CustomLink href="/">AutoTech autószervíz</CustomLink>
            <CustomLink  href="/ujmunkalap">Új munkalap</CustomLink>
            <CustomLink  href="/aktivmunkalap">Aktív munkalapok</CustomLink>
            <CustomLink  href="/lezartmunkalap">Lezárt munkalapok</CustomLink>
            <CustomLink  href="/osszesmunkalap">Összes munkalap</CustomLink>
            <CustomLink  href="/megrendelok">Megrendelők</CustomLink>
            <CustomLink  href="/munkalapok">Munkalapok</CustomLink>
            <li className="menubutton" onClick={showSidebar}><a href="#/"><svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="26"><path fill = "#f0ffff" d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></a></li>
        </ul>
        <ul className = "sidebar">
            <li onClick={hideSidebar}><a href="/"><svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="26"><path fill="#f0ffff" d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></a></li>
            <CustomLink href="/ujmunkalap">Új munkalap</CustomLink>
            <CustomLink href="/aktivmunkalap">Aktív munkalapok</CustomLink>
            <CustomLink href="/lezartmunkalap">Lezárt munkalapok</CustomLink>
            <CustomLink href="/osszesmunkalap">Összes munkalap</CustomLink>
        </ul>
    </nav>
    
  )
}
export default Navbar

function CustomLink({href,children}){
    const path = window.location.pathname
    return (
        <li className={path === href ? "hideonMobile active" : "hideonMobile"}>
            <a href={href}>
                {children}
            </a>
        </li>
    )
}

 function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
 }

 function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
 }


