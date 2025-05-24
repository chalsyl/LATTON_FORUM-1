import React from 'react'
import './styles/App.css'
import ThemeController from './components/themeController'

function App() {
  return (<>
    <div className="nav">
      <ThemeController />
    </div>
    <div className="flex justify-center items-center min-h-[80vh]">
      <form action="" className='fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4' method="post">
        <div className='form card-body place-items-center'>
          <h3 className="card-title">
            Connexion
          </h3>
          <input type="text" name="username" placeholder="Nom d'utilisateur" />
          <input type="password" name="password" placeholder='Mot de passe'/>
          <input type="submit" className='btn btn-primary ' value="Se connecter"/>
        </div>
      </form>
    </div>
    </>
  )
}

export default App
