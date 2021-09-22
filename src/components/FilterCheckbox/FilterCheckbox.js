import './FilterCheckbox.css';

function FilterCheckbox(props) {
    return (
      <label className="switch">
        <input className="switch__checkbox" type="checkbox" onClick={props.filterHandler}/>
        <span className="switch__slider"></span>
        <p className="switch__word">Короткометражки</p>
      </label>
    )
}

export default FilterCheckbox;
