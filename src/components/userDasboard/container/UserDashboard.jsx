import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUserData, clearDictionaryData } from '../../../redux/actions/user';
import { getUsername } from '../../dictionaryConcepts/components/helperFunction';
import DashboardDetails from '../components/DashboardDetails';
import CardWrapper from '../components/CardWrapper';
import AddDictionary from '../../dashboard/components/dictionary/AddDictionary';
import Title from '../../Title';

export class UserDashboard extends Component {
  static propTypes = {
    fetchUserData: PropTypes.func.isRequired,
    clearDictionaryData: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    networkError: PropTypes.string.isRequired,
    userDictionary: PropTypes.array.isRequired,
    userOrganization: PropTypes.array.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string,
      orgs: PropTypes.number,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  componentDidMount() {
    const username = getUsername();
    if (!username) {
      this.props.history.push('/');
      return;
    }
    this.props.fetchUserData(username, this.props);
  }

  componentWillUnmount() {
    this.props.clearDictionaryData();
  }

  gotoDictionary = (url) => {
    this.props.history.push(url);
  }

  handleHide = () => this.setState({ show: false });

  handleShow = () => this.setState({ show: true });

  render() {
    const {
      user: { name, orgs },
      userOrganization,
      userDictionary,
      loading,
      networkError,
    } = this.props;
    const dictionary = userDictionary.length === 1 ? 'dictionary' : 'dictionaries';
    return (
      <div className="container custom-max-width">
        <Title title="Home" />
        {this.state.show ? (
          <AddDictionary show={this.state.show} handleHide={this.handleHide} />
        ) : ''}
        <div className="row justify-content-center">
          <div className="col-12 user-info">
            <div className="row">
              <div className="greetings">
                <h3>
Welcome
                  {' '}
                  {name}
                </h3>
              </div>
            </div>
            <div className="row">
              <DashboardDetails
                numberOfOrgs={orgs}
                numberOfDictionary={userDictionary.length}
                organizations={userOrganization}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 user-dictionary-wrapper">
            <div className="row">
              <div className="greetings col-12 d-flex justify-content-between">
                <h3>
Your
                  {' '}
                  {dictionary}
                </h3>
                <h6 className="see-more-link">
                  <button
                    type="submit"
                    className="btn btn-outline-primary btn-sm"
                    id="add-dictionary"
                    onClick={this.handleShow}
                    disabled={loading}
                  >
                    <i className="fas fa-plus fa-fw" />
                    {' '}
New Dictionary
                  </button>
                </h6>
              </div>
              <div className="line-divider" />
            </div>
            <div className="row justify-content-center">
              <div className="col-12">
                <CardWrapper
                  dictionaries={userDictionary}
                  fetching={loading}
                  gotoDictionary={this.gotoDictionary}
                  networkError={networkError}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  user: state.user.user,
  userDictionary: state.user.userDictionary.concat(state.organizations.dictionariesOwnedByUsersOrg),
  userOrganization: state.user.userOrganization,
  loading: state.user.loading,
  networkError: state.user.networkError,
});

export default connect(
  mapStateToProps,
  { fetchUserData, clearDictionaryData },
)(UserDashboard);
