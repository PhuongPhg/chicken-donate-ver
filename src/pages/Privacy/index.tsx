import IntroPrivacy from 'components/Intro/IntroPrivacy';

export default function Privacy() {
  return (
    <div style={{ paddingTop: 150 }}>
      <IntroPrivacy />
      <div style={{ paddingLeft: '20%', paddingRight: '20%', minHeight: '50vh' }}>
        <p>
          By creating an organizations on Chicken Donate, you are create your own contract based on our logics. Please
          make sure to use your correct address wallet since you cannot "Undo" or "Delete" it.
          <br />
          <br />
          Also, to make a withdraw, make sure you connect to the correct wallet, and reload if needed.
        </p>
      </div>
    </div>
  );
}
