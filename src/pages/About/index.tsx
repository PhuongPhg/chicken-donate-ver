import logo from 'assets/Logo.svg';
import IntroAbout from "components/Intro/IntroAbout";

export default function About(){
  return (
    <div style={{paddingTop: 150}}>
      <IntroAbout/>
      <div style={{ paddingLeft: '20%', paddingRight: '20%'}}>
        <p>
          We started the Chicken Donate with 2 members first, then we grow up to 3 members now. Our goal is to make the donation environment to be clearer and support others organizations to achieve, reach out to more people.
          <br />
      <img src={logo} alt="" style={{ paddingLeft: '20%', paddingRight: '20%'}}/>

          <br />
          The idea comes from that in Vietnam 2022, there is a lot of "drama" about donation. The origin reason behinds of all this drama comes from the lack of transparency of the person who called for donations. So to resolve the problem above, we choose  Blockchain to start this project, where all the transactions cannot be edited and public to every one who use blockchain wallet.
        </p>
      </div>
    </div>
  )
}