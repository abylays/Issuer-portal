import React from 'react';
import 'pages/api-key/ApiKey.scss'

const ApiKeyPage = () => {
  return (
    <div className='page-form'>
      <h1 className='title'>Generate API key hash</h1>
      <p>Here you will find a link which will lead you to a page where you can generate a new API hash key for your application. You need to use an API hash key to communicate with our web services.</p>
      <p>Note: you only need the <code>API key hash</code> value, the regular API key is used for our SDK.</p>
      <a
        href='https://affinity-onboarding-frontend.staging.affinity-project.org/?source=vcms-api-sandbox'
        target='_blank'
        rel='noreferrer noopener'
      >
        Generate API key hash here
      </a>
    </div>
  )
}

export default ApiKeyPage
