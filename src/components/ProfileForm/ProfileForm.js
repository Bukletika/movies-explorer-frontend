import "./ProfileForm.css";

function ProfileForm(props) {
    return (
    <form className="form-profile form-profile_type_centered" name={`${props.name}`} onSubmit={props.onSubmit}>
      <h2 className="form-profile__heading">Привет, {props.userData.name}!</h2>
      {props.children}
      <button
        className={props.buttonCondition ? 'form-profile__button' : 'form-profile__button form-profile__button_type_disabled'}
        disabled={!props.buttonCondition}
        type="submit">{props.submitBtnText}
      </button>
    </form>
    )
}

export default ProfileForm;

