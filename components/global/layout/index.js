import { Fragment } from 'react';
import Menu from '../menu';
import Footer from '../footer';



function Layout(props){
    return(
        <Fragment>
            <Menu />
            <main>
                {props.children}
            </main>         
            <Footer />
        </Fragment>

    );
}

export default Layout;