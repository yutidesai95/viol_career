import Link from 'next/link';
import { useState } from "react";
import styles from '../../menu.module.css';
//import Modalmenu from '../../../layo';
//import { useSession, signOut } from 'next-auth/client';
import Script from 'next/script'

function Navbar(){

    // const [session, loading] = useSession();
    // function logoutHandler(){
    //     signOut();
    // }
    const [isOpen,setIsOpen] = useState(false);
    const openMenu= ()=> setIsOpen(!isOpen);
    return(
      <header className={styles.header}>
      <Script
        src="./scripts/header.js"
        strategy="beforeInteractive"
        />
                    <nav className={styles.navbar}>
                    {/* <div className={styles.navLt}>
                    <Link className={styles.active} href='/'>
                            <a>
                                <ul className={styles.parentLogoDiv}>
                                <li className={styles.logoDiv}><img className={styles.navlogo} src="/images/VLogo.png" alt="logo" width="120" height="35" /></li>
                                <li className={styles.textDiv}><p className={styles.navName}>Careers</p></li>
                                </ul>
                            </a>
                    </Link>
                    </div> */}

                    <ul className={styles.logomenu}>
                        <li className={styles.logoMenuItem}>
                            <Link href='/'>
                              <a><img className={styles.navlogo} src="/images/Vlogo.png" alt="Viollogo" width="120" height="35" /></a>
                            </Link>
                        </li>
                        
                        <li className={styles.logoMenuItem}>
                           <Link href='/'>
                             <a className={styles.navlogolink}>Careers</a>
                            </Link>
                        </li>
                        
                     
                    
                    </ul>



                    
                  
                    <ul className={isOpen === false ? 
                            styles.navmenu : styles.navmenu +' '+ styles.active}>


                       

                        <li className={styles.navitem}>
                            <Link href='https://www.viol.tech/'>
                              <a className={isOpen === false ? 
                                        styles.navlink : styles.navlink+' '+styles.active}
                                        onClick={openMenu}>Viol Home</a>
                            </Link>
                        </li>
                        
                        <li className={styles.navitem}>
                           <Link href='https://www.viol.tech/about'>
                             <a className={isOpen === false ? 
                                        styles.navlink : styles.navlink+' '+styles.active}
                                        onClick={openMenu}>About</a>
                            </Link>
                        </li>
                        
                     
                        {/* <li className={styles.navitem}>
                           <Modalmenu /> 
                        </li> */}
                        {/* {session && (
                            <li className={styles.navitem}>
                            <button className={styles.logoutbtn} onClick={logoutHandler}>Logout</button>
                            </li>
                        )}
           */}
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