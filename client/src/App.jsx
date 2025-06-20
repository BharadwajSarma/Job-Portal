import React, { useContext } from 'react'
import{Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Applyjobs from './pages/Applyjobs'
import Application from './pages/Application'
import RecruiterLogin from './components/RecruiterLogin'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import Addjob from './pages/Addjob'
import ManageJobs from './pages/ManageJobs'
import ViewApplication from './pages/ViewApplication'
import 'quill/dist/quill.snow.css'

const App = () => {
  const{showRecruiterLogin}=useContext(AppContext)
  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/apply-job/:id' element={<Applyjobs/>}/>
        <Route path='/applications' element={<Application/>}/>
        <Route path='/dashboard' element={<Dashboard/>}> 
            <Route path='add-job' element={<Addjob/>}/>
            <Route path='manage-jobs' element={<ManageJobs/>}/>
            <Route path='view-applications' element={<ViewApplication/>}/>
        </Route>
      </Routes>
    </div>
  )
}
 
export default App