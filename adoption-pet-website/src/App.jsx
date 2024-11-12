//import './App.css'
import LoginForm from './LoginForm/LoginForm'
import Homepage from './pages/Homepage'
import About from './pages/About'
import  Admin from './pages/Admin'
import AccManagement from './pages/AccManagement'; 
import AdoptionA from './pages/AdoptionA';
import PetList from './pages/PetList'
import ApplicationDetails from './pages/ApplicationDetails'
import AdoptPet from './pages/AdoptPet'
import PetDetails from './pages/PetDetails'
import AdoptionForm from './pages/AdoptionForm'
import PetAppForm from './pages/PetAppForm'
import AdminPetDetails from './pages/AdminPetDetails'
import UserProfile from './pages/UserProfile'
import Message from './pages/Message'
import ManageListings from './pages/ManageListings'
import ForgotPass from './pages/ForgotPass'
import ResetPassword from './pages/ResetPassword';
import AdoptTrack from './pages/AdoptTrack'
import { BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {

  return (
    <> 
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path='/admin' element = {<Admin/>}/>
        <Route path="/homepage" element={<Homepage/>} />
        <Route path="/about" element={<About/>} />
        <Route path="/AccManagement" element={<AccManagement />} />
        <Route path = "/AdoptionA" element = {<AdoptionA/>}/>
        <Route path = "/PetList" element = {<PetList/>}/>
        <Route path = "/ApplicationDetails/:id" element = {<ApplicationDetails/>}/>
        <Route path = "/AdoptPet" element = {<AdoptPet/>}/>
        <Route path = "/PetDetails/:id" element = {<PetDetails/>}/>
        <Route path = "/AdoptionForm" element = {<AdoptionForm/>}/>
        <Route path = "/PetAppForm" element = {<PetAppForm/>}/>
        <Route path = "/AdminPetDetails/:id" element = {<AdminPetDetails/>}/>
        <Route path ="/Message" element ={<Message/>}/>
        <Route path ="/UserProfile" element ={<UserProfile/>}/>
        <Route path ="/ManageListings" element ={<ManageListings/>}/>
        <Route path ="/ForgotPass" element ={<ForgotPass/>}/>
        <Route path ="/ResetPassword" element ={<ResetPassword/>}/>
        <Route path ="/AdoptTrack" element ={<AdoptTrack/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
