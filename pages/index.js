import Head from 'next/head';
import { Fragment } from 'react';
import Dashboard from '../components/dashboard';

export default function landingpage() {
  return (
      <Fragment>
          <Head>
                      {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=UA-159917229-1`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-159917229-1', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />                    
        <link rel="canonical" href="http://violtech.com/" />        
      </Head>   
            <div>
              <Dashboard /> 
            </div>
      </Fragment>
  )
}
