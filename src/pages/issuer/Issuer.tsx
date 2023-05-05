import React, {useContext, useState} from 'react';
import AppContext from 'context/app';
import {Button, FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import ApiService from 'utils/apiService';
import {employmentVcData,norwegianBankIdVcData,norwegianNavVcData} from 'utils/vc-data-examples/employment';
import {UnsignedW3cCredential, W3cCredential} from 'utils/apis';
import 'pages/issuer/Issuer.scss'
import ReactJson from 'react-json-view';

interface State {
    currentUnsignedVC: UnsignedW3cCredential | null,
    currentSignedVC: W3cCredential | null,
    isCurrentVCVerified: boolean,
}


const Issuer = () => {

    const [state, setState] = useState<State>({
        currentUnsignedVC: null,
        currentSignedVC: null,
        isCurrentVCVerified: false
      })
      const {appState} = useContext(AppContext);
      const [inputDID, setinputDID] = useState(appState.didToken || '')
      const [VCschemaData, setVCschemaData] = useState<any>(JSON.stringify(employmentVcData,undefined,4))
      console.log('---ssss');


      /**
       * Get stored VCs from user cloud wallet on component mount.
       * */
    //   useEffect(() => {
    //     const getSavedVCs = async () => {
    //       try {
    //         const arrayOfStoredVCs = await ApiService.getSavedVCs();

    //         setState({
    //           ...state,
    //           storedVCs: [...arrayOfStoredVCs],
    //           isLoadingStoredVCs: false
    //         })
    //       } catch (error) {
    //         ApiService.alertWithBrowserConsole(error.message)

    //         setState({
    //           ...state,
    //           isLoadingStoredVCs: false
    //         })
    //       }
    //     }

    //     getSavedVCs();
    //   }, []);

    const isJson = (str: string) => {
      try {
          JSON.parse(str);
      } catch (e) {
          return false;
      }
      return true;
  }

      /**
       * Function for issuing an unsigned employment VC.
       * */
      const issueEmploymentPersonVC = async () => {
        try {
          if (isJson(VCschemaData)) {
            const example = {...JSON.parse(VCschemaData)}

            example.holderDid = inputDID || appState.didToken || '';

            const {unsignedVC} = await ApiService.issueUnsignedVC(example);

            setState({
              ...state,
              currentUnsignedVC: unsignedVC,
              currentSignedVC: null,
              isCurrentVCVerified: false
            })

            alert('Unsigned VC successfully created.');
          }
        } catch (error) {
          ApiService.alertWithBrowserConsole(error.message);
        }
      }

      /**
       * Function for signing an unsigned VC.
       * */
      const signVc = async () => {
        try {
          if( state.currentUnsignedVC ) {
            const {signedCredential} = await ApiService.signVC({
              unsignedCredential: state.currentUnsignedVC
            });

            setState({
              ...state,
              currentSignedVC: signedCredential
            })

            alert('Unsigned VC successfully signed.');
          }
          else {
            alert('No unsigned VC found. Please create one and try again.')
          }
        } catch (error) {
          ApiService.alertWithBrowserConsole(error.message);
        }
      }

      const onDidValueChange = (value: string) => {
        setinputDID(value)
      }

      const onVCschemaDataChange = (value: string) => {
        setVCschemaData(value)
      }

      const resetToEmploymentDefaults = () => {
        setVCschemaData(JSON.stringify(employmentVcData,undefined, 4))
        setinputDID(appState.didToken || '')
      };
    const resetToDefaultsBankId = () => {
        setVCschemaData(JSON.stringify(norwegianBankIdVcData,undefined, 4))
        setinputDID(appState.didToken || '')
    };
    const resetToNavDefaults = () => {
        setVCschemaData(JSON.stringify(norwegianNavVcData,undefined, 4))
        setinputDID(appState.didToken || '')
    }


    return (
        <div className='tutorial'>
            {/* <div className='tutorial__column tutorial__column--issuer'>
                <h3 className='tutorial__column-title'>Issuer</h3>
                <div className='tutorial__column-steps'> */}
                <div className='tutorial__step'>
                    <p className='tutorial__step-text'>
                    {/* <strong>Step 1:</strong>  */}
                    <strong>Issue unsigned VC</strong>
                        <Button
                            style={{marginLeft: '15px'}}
                            onClick={e => resetToDefaultsBankId()}
                        >Bank ID</Button>
                        <Button
                            style={{marginLeft: '15px'}}
                            onClick={e => resetToEmploymentDefaults()}
                        >Employee Credential</Button>
                        <Button
                            style={{marginLeft: '15px'}}
                            onClick={e => resetToNavDefaults()}
                        >Tax Certificate</Button>

                   {/* <Button
                    style={{float: 'right'}}
                    onClick={e => resetToDefaults()}
                    >Reset to defaults</Button>*/}
                    </p>
                    <FormGroup
                      style={{margin: '30px 0'}}
                    >
                    <FormLabel>Enter VC data:</FormLabel>
                    <FormControl
                      as="textarea"
                      rows={15}
                      placeholder="Enter VC data"
                      aria-label="Verifiable Credential"
                      aria-describedby="basic-addon1"
                      value={VCschemaData}
                      onChange={e => onVCschemaDataChange(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup
                      style={{margin: '30px 0'}}
                    >
                    <FormLabel>Receiver DID:</FormLabel>
                    <FormControl
                      as="textarea"
                      rows={3}
                      placeholder="Receiver DID"
                      aria-label="Username"
                      aria-describedby="basic-addon1"
                      value={inputDID}
                      onChange={e => onDidValueChange(e.target.value)}
                    />
                    </FormGroup>
                    <Button onClick={issueEmploymentPersonVC}>Issue unsigned VC
                    {/*{
                      inputDID === appState.didToken ? ' self' : ' another did'
                    }*/}
                    </Button>
                </div>
                <div className='tutorial__step'>
                    <span className='tutorial__step-text'>
                    {/* <strong>Step 2:</strong>  */}
                    <strong>Sign the unsigned VC</strong>
                    </span>
                    <Button onClick={signVc}>Sign unsigned VC</Button>
                </div>
                {/* </div>
            </div> */}
            <div className="json-tree">
              <ReactJson
              src={state.currentSignedVC || state.currentUnsignedVC || {}}
              name={(state.currentSignedVC && 'Signed VC') || (state.currentUnsignedVC && 'Unsigned VC') || '-empty-' }
              />
            </div>
        </div>
    )
}

export default Issuer
