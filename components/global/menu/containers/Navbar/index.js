import Link from 'next/link';
import { useState } from "react";
import styles from '../../menu.module.css';
import { useSession, signOut } from 'next-auth/client';
import Script from 'next/script'

function Navbar(){

    const [session, loading] = useSession();
    function logoutHandler(){
        signOut();
    }
    const [isOpen,setIsOpen] = useState(false);
    const openMenu= ()=> setIsOpen(!isOpen);
    return(
      <header className={styles.header}>
          <Script
  src="./scripts/header.js"
  strategy="beforeInteractive"
/>
                    <nav className={styles.navbar}>
                    <div className={styles.navLt}>
                    <Link className={styles.active} href='/'>
                            <a >
                                <img className={styles.navlogo} src="/images/Logo.png" alt="logo" width="120" height="35" />
                            </a>
                    </Link>
                    </div>
                  
                    <ul className={isOpen === false ? 
                            styles.navmenu : styles.navmenu +' '+ styles.active}>
                       
                        
                        {session && (
                            <li className={styles.navitem}>
                            <button className={styles.logoutbtn} onClick={logoutHandler}>Logout</button>
                            </li>
                        )}
          
                    </ul>
                    <button className={isOpen === false ? 
                                        styles.hamburger : styles.hamburger+' '+styles.active}
                                        onClick={openMenu}
                                        >
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                    </button>
                    </nav>
                </header> 
               
        
    );
}

export default Navbar;