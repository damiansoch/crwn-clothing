import SignUpForm from "../../components/sign-up-form/sign-up form.component";
import SignIpForm from "../../components/sign-in-form/sign-in-form.component";
import "./authentication.styles.scss";

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignIpForm />
      <SignUpForm />
    </div>
  );
};
export default Authentication;
