import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const PassManager = () => {
  const [passwordList, updatePasswordList] = useState([])
  const [websiteInputUser, setWebsiteInput] = useState('')
  const [userInputName, setUserName] = useState('')
  const [userInputPassword, setUserPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [filterResult, setFilterResult] = useState([])
  const [lastAddedWebsite, setLastAddedWebsite] = useState('')
  const [isUpdate, setUpdateStatus] = useState(false)
  const [userUptWebsite, setUserUptWebsite] = useState('')
  const [userUptPassword, setUserUptPassword] = useState('')
  const [userUptName, setUserUptName] = useState('')
  const [userUptId, setUserUptId] = useState(null)
  const [showSavedPasswords, setShowSavedPasswords] = useState(false)

  const preventSubmit = event => {
    event.preventDefault()
  }

  const handleWebsiteInput = event => {
    setWebsiteInput(event.target.value)
  }

  const focused = () => {
    setLastAddedWebsite('')
  }
  const onAddPasswords = () => {
    if (
      websiteInputUser.trim() === '' ||
      userInputPassword.trim() === '' ||
      userInputName.trim() === ''
    ) {
      return
    }

    const colors = [
      'aqua',
      'teal',
      'black',
      'maroon',
      'orange',
      'yellow',
      'indigo',
      'pink',
      'gold',
      'coral',
    ]

    const newEntry = {
      websiteInputUser,
      userInputPassword,
      userInputName,
      id: uuidv4(),
      colorProfile: colors[Math.floor(Math.random() * colors.length)],
    }

    setLastAddedWebsite(websiteInputUser)
    updatePasswordList(prev => [...prev, newEntry])
    setFilterResult(prev => [...prev, newEntry])

    setWebsiteInput('')
    setUserName('')
    setUserPassword('')

    setShowPassword(false)
  }

  // const toggleShowPass = () => {
  //   setShowPassword(prev => !prev)
  // }

  const searchResult = event => {
    const searchValue = event.target.value.toLowerCase()
    setSearchInput(searchValue)

    const filteredResults = passwordList.filter(eachPassword =>
      eachPassword.websiteInputUser.toLowerCase().includes(searchValue),
    )

    setFilterResult(filteredResults)
  }

  const deletetheTab = id => {
    const filteredList = passwordList.filter(
      eachPassword => eachPassword.id !== id,
    )
    updatePasswordList(filteredList)
    setFilterResult(filteredList)
    setLastAddedWebsite('')
  }
  const updatetheTab = password => {
    setUserUptId(password.id)

    setUpdateStatus(true)
    setUserUptWebsite(password.websiteInputUser)
    setUserUptName(password.userInputName)
    setUserUptPassword(password.userInputPassword)
  }

  const addUpdatedInputs = () => {
    if (!userUptId) return

    setFilterResult(prevList =>
      prevList.map(password =>
        password.id === userUptId
          ? {
              ...password,
              userInputName: userUptName,
              userInputPassword: userUptPassword,
              websiteInputUser: userUptWebsite,
            }
          : password,
      ),
    )
    setUpdateStatus(false)
    setUserUptId(null)
  }

  const closeUpdateForm = () => {
    setUpdateStatus(false)
    setUserUptWebsite('')
    setUserUptName('')
    setUserUptPassword('')
  }

  const isListEmpty = filterResult.length === 0

  return (
    <div className="bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
        alt="app logo"
        className="logo-image"
      />
      <div className="sub-container">
        <div className="form-container">
          <h1 className="heading">Add New Password</h1>
          <form onSubmit={preventSubmit}>
            <div className="website-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="website"
              />
              <input
                value={websiteInputUser}
                type="text"
                className="web-inp"
                placeholder="Enter Website"
                onChange={handleWebsiteInput}
                onFocus={focused}
              />
            </div>

            <div className="website-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="website"
              />
              <input
                value={userInputName}
                onChange={e => setUserName(e.target.value)}
                type="text"
                className="web-inp"
                placeholder="Enter Username"
                onFocus={focused}
              />
            </div>

            <div className="website-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="website"
              />
              <input
                value={userInputPassword}
                type={showPassword ? 'text' : 'password'}
                className="web-inp"
                placeholder="Enter Password"
                onChange={e => setUserPassword(e.target.value)}
              />
              <button
                type="button"
                className="eye-icon"
                onClick={() => setShowPassword(prev => !prev)}
              >
                {showPassword ? '🙈' : '👁'}{' '}
              </button>
            </div>

            <button type="submit" className="add-btn" onClick={onAddPasswords}>
              Add
            </button>
          </form>
          {lastAddedWebsite && (
            <p className="added-website">website provided</p>
          )}
        </div>

        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="manager-image"
          />
        </div>
      </div>

      <div className="bottom-container">
        <div className="bottom-contents">
          <h1 className="heading">
            Your Passwords{' '}
            <span className="password-count">{filterResult.length}</span>
          </h1>

          <div className="search-bar">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
              alt="search"
              className="search-icon"
            />
            <input
              type="search"
              className="web-inp"
              value={searchInput}
              onChange={searchResult}
              placeholder="Search"
            />
          </div>
        </div>
        {isUpdate && (
          <div className="hidden-form">
            <form onSubmit={preventSubmit}>
              <div className="website-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="website"
                />
                <input
                  type="text"
                  className="web-inp"
                  placeholder="Enter new Website"
                  value={userUptWebsite}
                  onChange={e => setUserUptWebsite(e.target.value)}
                />
              </div>
              <div className="website-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="website"
                />
                <input
                  type="text"
                  className="web-inp"
                  value={userUptName}
                  placeholder="Enter new Username"
                  onChange={e => setUserUptName(e.target.value)}
                />
              </div>
              <div className="website-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="website"
                />
                <input
                  className="web-inp"
                  placeholder="Enter new Password"
                  value={userUptPassword}
                  type="password"
                  onChange={e => setUserUptPassword(e.target.value)}
                />
              </div>{' '}
            </form>
            <div className="new-buttons-container">
              <button
                type="button"
                className="close-button"
                onClick={closeUpdateForm}
              >
                Close
              </button>
              <button
                type="submit"
                className="upt-button "
                onClick={addUpdatedInputs}
              >
                Update
              </button>
            </div>
          </div>
        )}

        <div className="second-container">
          <input
            id="check"
            type="checkbox"
            className="checkbox-inp"
            checked={showSavedPasswords}
            onChange={() => setShowSavedPasswords(prev => !prev)}
          />
          <label htmlFor="check">Show Passwords</label>
        </div>
        {lastAddedWebsite && showPassword && (
          <p className="added-website">password provided</p>
        )}

        {isListEmpty ? (
          <div className="no-passwords-cont">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
              alt="no passwords"
              className="no-passwords"
            />
            <p className="par-nopass">No Passwords</p>
          </div>
        ) : (
          <ul className="password-list">
            {filterResult.map(eachPassword => (
              <PasswordItem
                key={eachPassword.id}
                passwordList={eachPassword}
                show={showSavedPasswords}
                deletetheTab={deletetheTab}
                updatetheTab={() => updatetheTab(eachPassword)}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default PassManager
