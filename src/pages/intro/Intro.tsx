import React from 'react';
import universityIcon from 'assets/images/icons/university.svg'
import studentIcon from 'assets/images/icons/student.svg'
import calculatorIcon from 'assets/images/icons/calculator.svg'
import 'pages/intro/Intro.scss'

/**
 * Stateless component responsible for rendering a simple SSI introduction screen.
 * */
const IntroPage = () => {
  return (
    <div className='intro page-form page-form--large'>
      <div className='intro__heading-block'>
        <h1 className='intro__heading'>
          <span className='intro__first-letter font-weight-bold'>Self</span>&nbsp;
          <span className='intro__second-letter font-weight-bold'>Sovereign</span>&nbsp;
          <span className='intro__third-letter font-weight-bold'>Identity</span>
        </h1>
        <h5 className='intro__subheading'>simple introduction and example by Affinidi</h5>
      </div>
      <div className='intro__text-block'>
        <h4>What is Self Sovereign Identity (SSI)?</h4>
        <p>SSI is a digital movement that aims to enable individuals or organizations to have sole ownership of their identity, and to have control over how their personal data is shared and used.</p>
        <p>Under self-sovereign identity model, individuals and organizations (holders) who have one or more identifiers (something that enables a subject to be discovered and identified) can present claims relating to those identifiers without having to go through an intermediary.</p>
        <h4>How does SSI work?</h4>
        <p>Self-sovereign identity systems use blockchains – distributed ledgers – so that decentralized identifiers can be looked up without involving a central directory. Blockchains don’t solve the identity problem by themselves, but they do provide a missing link that allows things we’ve known about cryptography for decades to suddenly be used. That allows people to prove things about themselves using decentralized, verifiable credentials just as they do offline.</p>
        <h4>Roles in SSI</h4>
        <p>There are 3 roles in SSI cycle: <strong>ISSUER</strong>, <strong>VERIFIER</strong>, and <strong>HOLDER</strong>. Each of them is explained in the example below.</p>
      </div>
      <div className='intro__example'>
        <div className='intro__example-role'>
          <span className='intro__example-role-title'>Issuer</span>
          <span className='intro__example-role-subtitle'>(e.g. University)</span>
          <img className='intro__example-icon' src={universityIcon} alt='University icon'/>
        </div>
        <div className='intro__example-role-directions'>
          <div className='intro__example-top-direction'>
            <span className='intro__example-direction-text'>Issues Credential</span>
            <span className='intro__example-direction-arrow'/>
          </div>
          <div className='intro__example-bottom-direction'>
            <span className='intro__example-direction-text'>Asks for Credential</span>
            <span className='intro__example-direction-arrow intro__example-direction-arrow--left'/>
          </div>
        </div>
        <div className='intro__example-role'>
          <span className='intro__example-role-title'>Holder</span>
          <span className='intro__example-role-subtitle'>(e.g. Graduate)</span>
          <img className='intro__example-icon' src={studentIcon} alt='Student icon'/>
        </div>
        <div className='intro__example-role-directions'>
          <div className='intro__example-top-direction'>
            <span className='intro__example-direction-text'>Presents Credential</span>
            <span className='intro__example-direction-arrow'/>
          </div>
        </div>
        <div className='intro__example-role'>
          <span className='intro__example-role-title'>Verifier</span>
          <span className='intro__example-role-subtitle'>(e.g. Employer)</span>
          <img className='intro__example-icon' src={calculatorIcon} alt='Calculator icon'/>
        </div>
      </div>
      <div className='intro__roles-description'>
        <div className='intro__roles-description-role'>
          <h3>Issuer</h3>
          <p>An entity that issues a credential. Eg: an education entity like a university that issues a student record like a graduate certificate. Issuer has the right to revoke a credential</p>
        </div>
        <div className='intro__roles-description-role'>
          <h3>Holder</h3>
          <p>An entity that has lifecycle control over the issued credentials like sharing, deleting. Eg: A student that holds a credential issued by an issuer on their wallet (a wallet could be an app that stores users credential data locally or a custodial wallet managed on behalf of a holder)</p>
        </div>
        <div className='intro__roles-description-role'>
          <h3>Verifier</h3>
          <p>An entity that verifies if the credential shared by a holder is valid (i.e. if the credential comes from a trusted issuer)</p>
        </div>
      </div>
      <p>For more information and well documented tutorials, please visit <a href='https://www.affinidi.com/vcms' target='_blank' rel='noreferrer'>https://www.affinidi.com/vcms</a>.</p>
    </div>
  )
}

export default IntroPage
