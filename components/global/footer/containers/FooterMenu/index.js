import classes from '../../footer.module.css';
import Aos from 'aos';
import "aos/dist/aos.css";
import { useEffect } from 'react';
import Link from 'next/link';

export default function FooterMenu() {
    useEffect(() => {
        Aos.init({                                    
            anchorPlacement: ' top-bottom' });
     }, []);
  return (
      <div>
<div className={classes.cards}>
    {/* Column1  */}
               
    <div data-aos="fade-up" className={classes.card}>
                        <div className={classes.column__icon}>
                        </div>
                        <div className={classes.column__heading}>
                            <h3>COMPANY</h3>
                        </div>
                        <div className={classes.column__content}> 
                        <Link href='/services'>
                            <a className={classes.Link}>
                                <h6>Services</h6>
                            </a>
                        </Link>
                        <Link href='/about'>
                            <a className={classes.Link}>
                                <h6>About</h6>
                            </a>
                        </Link>
                        <Link href='/careers'>
                            <a className={classes.Link}>
                                <h6>Careers</h6>
                            </a>
                        </Link>
                        <Link href='/support'>
                            <a className={classes.Link}>
                                <h6>Support</h6>
                            </a>
                        </Link>
                        </div>
                </div>
    {/* <!-- Column2 --> */}
    {/* <div data-aos="fade-up" className={classes.card}>
                        <div className={classes.column__icon}>
                        </div>
                        <div className={classes.column__heading}>
                            <h3>WHAT WE DO</h3>
                        </div>
                        <div className={classes.column__content}> 
                            <h6>Web Design & Developement</h6>
                            <h6>Digital Marketing</h6>
                            <h6>Branding</h6>
                            <h6>Content Writing</h6>
                            <h6>UI/UX Design</h6>
                        </div>
                    </div> */}
                

                {/* <!-- Column3 --> */}
                <div data-aos="fade-up" className={classes.card}>
                        <div className={classes.column__icon}>
                        </div>
                        <div className={classes.column__heading}>
                            <h3>LEGAL</h3>
                        </div>
                        <div className={classes.column__content}> 
                        <Link href='/'>
                            <a target="_blank" className={classes.Link}>
                                <h6>Policy</h6>
                            </a>
                        </Link>
                        <Link href='/'>
                            <a target="_blank" className={classes.Link}>
                                <h6>Terms</h6>
                            </a>
                        </Link>
                           
                           
                        </div>
                </div>

                
                {/* <!-- Column4 --> */}
            
                <div data-aos="fade-up" className={classes.card}>
                        <div className={classes.column__icon}>
                        </div>
                        <div className={classes.column__heading}>
                            <h3>STAY CONNECTED</h3>
                        </div>
                        <div className={classes.column__content}> 
                        <Link href='/'>
                            <a target="_blank" className={classes.Link}>
                                <h6>Instagram</h6>
                            </a>
                        </Link>
                        <Link href='/'>
                            <a target="_blank" className={classes.Link}>
                                <h6>Facebook</h6>
                            </a>
                        </Link>
                        <Link href='/'>
                            <a target="_blank" className={classes.Link}>
                                <h6>LinkedIn</h6>
                            </a>
                        </Link>                          
                        </div>
                </div>  
            </div>
            </div>
            )
        }