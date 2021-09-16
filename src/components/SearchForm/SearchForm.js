import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm() {
    return (
        <div className="search">
            <form className="search__form">
              <fieldset className="search__films">
                  <input className="search__form-input" type="search" placeholder="Фильм" required/>
                  <button className="search__form-button" type="submit">Найти</button>
              </fieldset>

              <FilterCheckbox />

            </form>
        </div>
    )
}

export default SearchForm;
