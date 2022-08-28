import IntroTerms from 'components/Intro/IntroTerms';

export default function Terms() {
  return (
    <div style={{ paddingTop: 150 }}>
      <IntroTerms />
      <div style={{ paddingLeft: '20%', paddingRight: '20%', minHeight: '50vh' }}>
        <p>
          <h2>About create account</h2>
          <p>
            To create an account here, you need to have metamask installed and be over 18 years old. And to create or
            using any features, please always connect your wallet so the contract can be run correctly.
          </p>
          <p>You’re responsible for all the activity on your account, including withdraw or donate to the others</p>
          <h2>Some other rules</h2>
          <p>
            <h3>Don’t break the law</h3> Don’t take any action that infringes or violates other people’s rights,
            violates the law, or breaches any contract or legal duty you have toward anyone.
          </p>
          <p>
            <h3>Don’t lie to people</h3> Don’t post information you know is false, misleading, or inaccurate. Don’t do
            anything deceptive or fraudulent.
          </p>
          <br />
          <br />
        </p>
      </div>
    </div>
  );
}
