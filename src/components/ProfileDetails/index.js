import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class ProfileDetails extends Component {
  state = {
    profile: null,
    apiStatus: 'INITIAL', // 'SUCCESS' or 'FAILURE'
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cookies.get('jwt_token')}`,
      },
    }

    this.setState({apiStatus: 'INITIAL'}) // To handle the loading state

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        this.setState({
          profile: data.profile_details,
          apiStatus: 'SUCCESS',
        })
      } else {
        throw new Error('Failed to fetch profile')
      }
    } catch (error) {
      this.setState({
        apiStatus: 'FAILURE',
      })
    }
  }

  render() {
    const {profile, apiStatus} = this.state

    if (apiStatus === 'INITIAL') {
      return <p>Loading...</p> // Show loading message
    }

    if (apiStatus === 'FAILURE') {
      return (
        <div>
          <p>Something went wrong. Please try again later.</p>
          <button type="button" onClick={this.getProfileData}>
            Retry
          </button>
        </div>
      )
    }

    return (
      <div className="profile">
        {profile ? (
          <>
            <img src={profile.profile_image_url} alt="profile" />
            <h1>{profile.name}</h1>
            <p>{profile.short_bio}</p>
          </>
        ) : (
          <p>No profile data available.</p> // In case profile is null
        )}
      </div>
    )
  }
}

export default ProfileDetails
