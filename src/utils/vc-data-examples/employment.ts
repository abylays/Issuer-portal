/**
 * Sample VC data for the employment type.
 * */
import {UnsignedW3cCredential, VCBuildUnsignedInput, W3cCredential,VCBuildUnsignedInputBankID} from 'utils/apis';

export const employmentVcData: VCBuildUnsignedInput = {
  type: 'EmploymentCredentialPersonV1',
  data: {
    '@type': ['Person', 'PersonE', 'EmploymentPerson'],
    worksFor: {
      '@type': ['EmployeeRole', 'PersonEmployeeRoleE'],
      reference: {
        '@type': 'ContactPoint',
        name: 'Alex Belcher',
        email: 'alex@gmail.com',
      },
      skills: ['Administrative work', 'Human resource manager'],
      offerLetter: 'https://google.com',
      experienceLetter: 'https://google.com',
      worksFor: {
        '@type': ['Organization', 'Education'],
        name: "Norwegian Institute of Science and technology",
      },
      salary: {
        '@type': ['Salary'],
        gross: {
          '@type': 'MonetaryAmount',
          value: 550000,
          currency: 'NOK',
        },
        net: {
          '@type': 'MonetaryAmount',
          value: 30000,
          currency: 'NOK',
        },
        frequency: 'Monthly',
      },
    },
    name: 'John Doe',
  },
  holderDid: ''
};
export const norwegianBankIdVcData: VCBuildUnsignedInputBankID = {
    "jsonLdContextUrl": "https://schema.affinidi.com/NorwegianBankIDV3V1-0.jsonld",
    "jsonSchemaUrl": "https://schema.affinidi.com/NorwegianBankIDV3V1-0.json",
    "typeName": "NorwegianBankIDV3",
    "credentialSubject": {
    "data": {
        "birthdate": "01-08-1995",
            "givenname": "Anushka",
            "name":"Anushka Subedi",
            "familyname":"Subedi",
            "reference":{
            "bankIDPartnerID":"001",
                "bankIDPartnerName":"Signicat",
                "partnerWebsite":"https://www.signicat.com/",
                "contactPersonName":"Thomas Osinga"
        },
        "credentialStatus":{
            "currentStatus":"Active",
                "statusReason":"Verified User",
                "id":"1234"
        }

    }
},
    "holderDid": "{{did}}"
};

export const norwegianNavVcData:VCBuildUnsignedInputBankID={
    "jsonLdContextUrl": "https://schema.affinidi.com/TaxCertificateNorway5V1-0.jsonld",
    "jsonSchemaUrl": "https://schema.affinidi.com/TaxCertificateNorway5V1-0.json",
    "typeName": "TaxCertificateNorway5",
        "credentialSubject": {
            "data": {
                "personalIncomeAndOrdinaryIncome":{
                    "salariesAndBenefits":"97000",
                    "interestOnBankDeposits":"0",
                    "totalIncome":"0"
                },
                "deduction":{
                    "minimumDeductionInOwnIncome":"890",
                    "premiumForPensionScheme":"0",
                    "totalDeduction":"0",
                    "ordinaryIncomeBeforeSpecialDeduction":"0"
                },
                "totalBasisForIncomeTax":{
                    "assets":"0",
                    "bankDeposits":"0",
                    "grossAssets":"0",
                    "netAssets":"0"
                },
                "name":"John Doe",
                "year":"2021",
                "estimatedTax":"7500",
                "nationalIdNumber":"01089317899",
                "settlement":{
                    "withholdingTax":"5000",
                    "additionalAdvance":"2500",
                    "remainingtax":"0"
                }
            }

},
    "holderDid": "{{did}}"
}

export const norwegianbankVcData: VCBuildUnsignedInputBankID = {
    "jsonLdContextUrl": "https://schema.affinidi.com/NorwegianBankIDV1-0.jsonld",
    "jsonSchemaUrl": "https://schema.affinidi.com/NorwegianBankIDV1-0.json",
    "typeName": "NorwegianBankID",
    "credentialSubject": {
        "data": {
            "birthdate": "01-08-1995",
            "givenname": "Anushka",
            "name":"Anushka Subedi",
            "familyname":"Subedi",
        }
    },
    "holderDid": "{{did}}"
}

export const unsignedEmploymentVC: UnsignedW3cCredential = {
  '@context': ['https://www.w3.org/2018/credentials/v1', {
    'EmploymentCredentialPersonV1': {
      '@id': 'https://schema.affinity-project.org/EmploymentCredentialPersonV1',
      '@context': {'@version': 1.1, '@protected': true}
    }, 'data': {
      '@id': 'https://schema.affinity-project.org/data', '@context': [null, {
        '@version': 1.1,
        '@protected': true,
        '@vocab': 'https://schema.org/',
        'EmploymentPerson': {
          '@id': 'https://schema.affinity-project.org/EmploymentPerson',
          '@context': {
            '@version': 1.1,
            '@protected': true,
            '@vocab': 'https://schema.org/',
            'worksFor': 'https://schema.org/worksFor'
          }
        },
        'PersonEmployeeRoleE': {
          '@id': 'https://schema.affinity-project.org/PersonEmployeeRoleE',
          '@context': {
            '@version': 1.1,
            '@protected': true,
            '@vocab': 'https://schema.org/',
            'reference': 'https://schema.affinity-project.org/reference',
            'skills': 'https://schema.affinity-project.org/skills',
            'worksFor': 'https://schema.org/worksFor',
            'offerLetter': 'https://schema.affinity-project.org/offerLetter',
            'experienceLetter': 'https://schema.affinity-project.org/experienceLetter',
            'salary': 'https://schema.affinity-project.org/salary'
          }
        },
        'Salary': {
          '@id': 'https://schema.affinity-project.org/Salary',
          '@context': {
            '@version': 1.1,
            '@protected': true,
            '@vocab': null,
            'gross': 'https://schema.affinity-project.org/gross',
            'net': 'https://schema.affinity-project.org/net',
            'frequency': 'https://schema.affinity-project.org/frequency'
          }
        },
        'PersonE': {
          '@id': 'https://schema.affinity-project.org/PersonE',
          '@context': {'@version': 1.1, '@protected': true, '@vocab': 'https://schema.org/'}
        },
        'OrganizationE': {
          '@id': 'https://schema.affinity-project.org/OrganizationE',
          '@context': {
            '@version': 1.1,
            '@protected': true,
            '@vocab': 'https://schema.org/',
            'hasCredential': 'https://schema.org/hasCredential',
            'industry': 'https://schema.affinity-project.org/industry',
            'identifiers': 'https://schema.affinity-project.org/identifiers'
          }
        },
        'Credential': {
          '@id': 'https://schema.affinity-project.org/Credential',
          '@context': {
            '@version': 1.1,
            '@protected': true,
            '@vocab': 'https://schema.org/',
            'dateRevoked': 'https://schema.affinity-project.org/dateRevoked',
            'recognizedBy': 'https://schema.affinity-project.org/recognizedBy'
          }
        },
        'OrganizationalCredential': {
          '@id': 'https://schema.affinity-project.org/OrganizationalCredential',
          '@context': {
            '@version': 1.1,
            '@protected': true,
            '@vocab': 'https://schema.org/',
            'credentialCategory': 'https://schema.affinity-project.org/credentialCategory',
            'organizationType': 'https://schema.affinity-project.org/organizationType',
            'goodStanding': 'https://schema.affinity-project.org/goodStanding',
            'active': 'https://schema.affinity-project.org/active',
            'primaryJurisdiction': 'https://schema.affinity-project.org/primaryJurisdiction',
            'identifier': 'https://schema.org/identifier'
          }
        }
      }]
    }
  }],
  'id': 'claimId:16a1df6f8e23b920',
  'type': ['VerifiableCredential', 'EmploymentCredentialPersonV1'],
  'holder': {'id': 'did:elem:EiDNDKiOcIBLu7TyLRju0lnh-0Q9kAz6iKwMyH6AhCuqhg'},
  'credentialSubject': {
    'data': {
      '@type': ['Person', 'PersonE', 'EmploymentPerson'],
      'worksFor': {
        '@type': ['EmployeeRole', 'PersonEmployeeRoleE'],
        'reference': {'@type': 'ContactPoint', 'name': 'Linda Belcher', 'email': 'lindabelcher@gmail.com'},
        'skills': ['burger', 'fries'],
        'offerLetter': 'https://google.com',
        'experienceLetter': 'https://google.com',
        'worksFor': {'@type': ['Organization', 'OrganizationE'], 'name': 'Bob\'s Burgers'},
        'salary': {
          '@type': ['Salary'],
          'gross': {'@type': 'MonetaryAmount', 'value': 10000, 'currency': 'INR'},
          'net': {'@type': 'MonetaryAmount', 'value': 8000, 'currency': 'INR'},
          'frequency': 'Monthly'
        }
      },
      'name': 'John Doe'
    }
  },
  'issuanceDate': '2021-02-09T09:06:32.039Z',
}

export const signedEmploymentVC: W3cCredential = {
  ...unsignedEmploymentVC,
  'issuer': 'did:elem:EiDNDKiOcIBLu7TyLRju0lnh-0Q9kAz6iKwMyH6AhCuqhg;elem:initial-state=eyJwcm90ZWN0ZWQiOiJleUp2Y0dWeVlYUnBiMjRpT2lKamNtVmhkR1VpTENKcmFXUWlPaUlqY0hKcGJXRnllU0lzSW1Gc1p5STZJa1ZUTWpVMlN5SjkiLCJwYXlsb2FkIjoiZXlKQVkyOXVkR1Y0ZENJNkltaDBkSEJ6T2k4dmR6TnBaQzV2Y21jdmMyVmpkWEpwZEhrdmRqSWlMQ0p3ZFdKc2FXTkxaWGtpT2x0N0ltbGtJam9pSTNCeWFXMWhjbmtpTENKMWMyRm5aU0k2SW5OcFoyNXBibWNpTENKMGVYQmxJam9pVTJWamNESTFObXN4Vm1WeWFXWnBZMkYwYVc5dVMyVjVNakF4T0NJc0luQjFZbXhwWTB0bGVVaGxlQ0k2SWpBellUaGtZekV6WldWbU1HTTRZMlprT0RRek5qazFOVFppWmpFd1pqTXdNRFU1WTJaaU5qRXpZVFkyWlRCbVl6UTFPVFZpTWpka01EbGhNelkzT0RFM01DSjlMSHNpYVdRaU9pSWpjbVZqYjNabGNua2lMQ0oxYzJGblpTSTZJbkpsWTI5MlpYSjVJaXdpZEhsd1pTSTZJbE5sWTNBeU5UWnJNVlpsY21sbWFXTmhkR2x2Ymt0bGVUSXdNVGdpTENKd2RXSnNhV05MWlhsSVpYZ2lPaUl3TXpaaE1XSTNNRFk0T1dZeU4yUTFNV013WmpjeU1EZGpNREl4TWpWaFpUazFObVJpTkRjeU5HTTRPREF4TkRRNE1XSTBZekJtTVdFM1pUaG1OVEUyTnpZaWZWMHNJbUYxZEdobGJuUnBZMkYwYVc5dUlqcGJJaU53Y21sdFlYSjVJbDBzSW1GemMyVnlkR2x2YmsxbGRHaHZaQ0k2V3lJamNISnBiV0Z5ZVNKZGZRIiwic2lnbmF0dXJlIjoiTk50Sng4MXlIR1FrSlEtdGkzeHdJd2Z0ZkFjSWxFN2dGRGJlYUVQX01hY0dGcjlvUjdqdEFUT3Y5WFlueG9uMnMyUkEtS2hJcFJaOFNJdVByd0tGUXcifQ',
  'proof': {
    'type': 'EcdsaSecp256k1Signature2019',
    'created': '2021-02-09T09:06:52Z',
    'verificationMethod': 'did:elem:EiDNDKiOcIBLu7TyLRju0lnh-0Q9kAz6iKwMyH6AhCuqhg#primary',
    'proofPurpose': 'assertionMethod',
    'jws': 'eyJhbGciOiJFUzI1NksiLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCJdfQ..prr-mMw13r_MqCI-lVZb9UEF3puqfQybe2gjDG9hMchNGBrxJrfTn5ETxr9-et8nl9oQg3Ludvc8dFWICFXtSQ'
  }
}
