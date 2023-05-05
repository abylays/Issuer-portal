import React from 'react';
import {render} from '@testing-library/react';
import RouterComponent from 'components/router/Router';
import {Router} from 'react-router-dom';
import {routes} from 'constants/routes';
import {createMemoryHistory} from 'history';

interface Props {
  isUserAuthenticated: boolean
}

const history = createMemoryHistory()
const SwitchRoute = ({isUserAuthenticated}: Props) => {
  return (
    <Router history={history}>
      <RouterComponent isUserAuthenticated={isUserAuthenticated}/>
    </Router>
  )
}

describe('Router component test', () => {
  test('Render public routes', () => {
    history.push(routes.SIGNUP)

    const {getByText} = render(<SwitchRoute isUserAuthenticated={false} />);

    expect(getByText('Create account')).toBeInTheDocument()

    history.push('/random-path')

    expect(getByText('Login in order to continue.')).toBeInTheDocument()
  })

  test('Render private routes', () => {
    history.push(routes.ROOT)

    const {getByText} = render(<SwitchRoute isUserAuthenticated={true} />);

    expect(getByText('Step 1:')).toBeInTheDocument()
    expect(getByText('Step 2:')).toBeInTheDocument()
    expect(getByText('Step 3:')).toBeInTheDocument()
    expect(getByText('Step 4:')).toBeInTheDocument()

    history.push('/random-path')

    expect(getByText('404')).toBeInTheDocument()
  })
})
