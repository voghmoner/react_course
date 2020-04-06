import React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ["All", "JavaScript", "R", "Ruby", "Haskell", "Python"];

  return (
    <ul className="flex-center">
      {languages.map(language => (
        <li key={language}>
          <button
            className="btn-clear nav-link"
            style={language === selected ? { color: "#eb4034" } : null}
            onClick={() => onUpdateLanguage(language)}
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
};

class Popular extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLanguage: "All",
      repos: {},
      error: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
    this.isLoading = this.isLoading.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  updateLanguage(selectedLanguage) {
    this.setState({
      selectedLanguage,
      error: null
    });

    if (!this.state.repos[selectedLanguage]) {
      fetchPopularRepos(selectedLanguage)
        .then(data => {
          this.setState(({ repos }) => ({
            repos: {
              ...repos,
              [selectedLanguage]: data
            }
          }));
        })
        .catch(error => {
          console.warn("Error fetching repos: ", error);

          this.setState({
            error: "There was an error fetching the repositories."
          });
        });
    }
  }

  isLoading() {
    const { selectedLanguage, repos, error } = this.state;

    return !repos[selectedLanguage] && error === null;
  }

  render() {
    const { selectedLanguage, repos, error } = this.state;
    return (
      <React.Fragment>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <p>LOADING</p>}

        {error && <p>{error}</p>}

        {repos[selectedLanguage] && (
          <pre>{JSON.stringify(repos[selectedLanguage], null, 2)}</pre>
        )}
      </React.Fragment>
    );
  }
}

export default Popular;

// // OLD layout, without function component

// import React from "react";

// class Popular extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       selectedLanguage: "All"
//     };

//     this.updateLanguage = this.updateLanguage.bind(this);
//   }

//   updateLanguage(selectedLanguage) {
//     this.setState({
//       selectedLanguage
//     });
//   }

//   render() {
//     const languages = ["All", "JavaScript", "R", "Ruby", "Haskell", "Python"];

//     return (
//       <ul className="flex-center">
//         {languages.map(language => (
//           <li key={language}>
//             <button
//               className="btn-clear nav-link"
//               style={
//                 language === this.state.selectedLanguage
//                   ? { color: "#eb4034" }
//                   : null
//               }
//               onClick={() => this.updateLanguage(language)}
//             >
//               {language}
//             </button>
//           </li>
//         ))}
//       </ul>
//     );
//   }
// }

// export default Popular;
