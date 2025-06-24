import { RouterProvider } from 'react-router-dom';
import BeerProvider from './context/Beers/BeerProvider';
import AuthProvider from './context/Auth/AuthProvider';
import RegistrationProvider from './context/registration/registrationProvider';
import { router } from './router';


function App() {

  return (
    <RegistrationProvider>
      <AuthProvider>
        <BeerProvider>
          <RouterProvider router={router} />
        </BeerProvider>
      </AuthProvider>
    </RegistrationProvider>
  )

}

export default App
