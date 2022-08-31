import classes from './footer.module.css'
import ProjectLead from './containers/ProjectLead'
import FooterMenu from './containers/FooterMenu'
import EndNote from './containers/EndNote'
import Aos from 'aos';
import "aos/dist/aos.css";

export default function Footer() {
  return (
    <footer className={classes.container}>
      <ProjectLead />
      <div data-aos="fade-up" className={classes.sectionline}></div>
      <FooterMenu />
      <EndNote />
    </footer>
  )
}