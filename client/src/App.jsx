import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Signup } from "./pages/commonPages/signup";
import { Signin } from "./pages/commonPages/signin";
import { Navbar } from "./components/navbar";
import { Particepent_Home } from "./pages/particepentPages/particepentHome";
import { Organizer_Home } from "./pages/organizerPages/organizerHome";
import { Logout } from "./pages/commonPages/logout";
import { CreateHackathon } from "./pages/organizerPages/createHackathon";
import { ViewEvents } from "./pages/organizerPages/viewEvents";
import { EditHackathon } from "./pages/organizerPages/editHackathon";
import { Theme_HackathonList } from "./pages/particepentPages/Theme_HackathonList";
import { HackathonDetailedScreen } from "./pages/particepentPages/HackathonDetailedScreen";
import { HackathonRegistrationForm } from "./pages/particepentPages/HackathonRegistrationForm";
import { ViewRegisterHackathons } from "./pages/particepentPages/ViewRegisterHackathons";
import { ViewParticepentList } from "./pages/organizerPages/ViewParticipantsList";
import { ViewParticepentListInEachHackathon } from "./pages/organizerPages/ViewParticipantInEachHackathon";

export const App = () => {

  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Signin/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/logout" element={<Logout/>}/>

          {/* Particepent Routes */}
          <Route path="/participant" element={<Particepent_Home/>}/>
          <Route path="/particepent/hackathon_list/:theme" element={<Theme_HackathonList/>}/>
          <Route path="/particepent/hackathon_Detailed_Screen/:hToken" element={<HackathonDetailedScreen/>}/>
          <Route path="/particepent/hackathon_Registration_Form/:hToken" element={<HackathonRegistrationForm/>}/>
          <Route path="/particepent/view_registered_hackathons/:uToken" element={<ViewRegisterHackathons/>}/>


          {/* Organizer Routes */}
          <Route path="/organizer" element={<Organizer_Home/>}/>
          <Route path="/organizer/create_hackathon" element={<CreateHackathon/>}/>
          <Route path="/organizer/viewEvents/:uToken" element={<ViewEvents/>}/>
          <Route path="/organizer/viewEvents/hackathonEdit/:hToken" element={<EditHackathon/>}/>
          <Route path="/organizer/view_participants_list/:uToken" element={<ViewParticepentList/>}/>
          <Route path="/organizer/viewParticepentInEachHackathon/:hToken" element={<ViewParticepentListInEachHackathon/>}/>

        </Routes>
      </BrowserRouter>
    </>
  )
}

