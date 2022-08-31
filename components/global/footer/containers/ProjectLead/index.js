import classes from '../../footer.module.css';
import Aos from 'aos';
import "aos/dist/aos.css";
import { useEffect } from 'react';


export default function ProjectLead() {

    
    useEffect(() => {
        Aos.init({ duration: 500,
            easing: 'ease-out-back',
            anchorPlacement: ' top-bottom' });
     }, []);
  return (
        <div className={classes.texts}>
                <div data-aos="fade-up" className={classes.heading1}>
                   GOT A PROJECT ? <span data-aos="fade-up" className={classes.heading1span}> Let us help you.</span>
                </div>
                <div data-aos="fade-up" className={classes.heading2}>
                    <h3>1.773.270.2704</h3>
                </div>
                <div data-aos="fade-up" className={classes.heading3}>
                    <h3>hello@viol.tech</h3>
                </div>  
            </div>
        )
    }