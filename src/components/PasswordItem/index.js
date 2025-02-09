import './index.css'
import CryptoJS from 'crypto-js'

const PasswordItem = props => {
  const {passwordList, show, deletetheTab, updatetheTab} = props
  const {websiteInputUser, userInputPassword, userInputName, id} = passwordList
  const {colorProfile} = passwordList

  const deleteTab = () => {
    deletetheTab(id)
  }

  const str = userInputPassword
  const encode = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str))

  const updateTab = () => {
    updatetheTab(passwordList)
  }

  return (
    <li className="subs-container">
      <div>
        <h1 className={`web-name ${colorProfile}`}>{websiteInputUser[0]}</h1>
      </div>
      <div className="cont">
        <h1 className="web-names">{websiteInputUser}</h1>
        <p className="inp-name">{userInputName}</p>
        {show ? (
          <div className="pas-name">{userInputPassword}</div>
        ) : (
          <div className="pas-name">
            <p className="pas">{encode}</p>
          </div>
        )}
      </div>
      <div className="dustbin">
        <button
          type="button"
          className="bot"
          data-testid="update"
          onClick={updateTab}
          aria-label="update"
        >
          <img
            src="https://res.cloudinary.com/derbjij6p/image/upload/v1739138366/pencil_rfetxq.png"
            className="update-icon"
            alt="update"
          />
        </button>
        <button
          type="button"
          className="bot"
          data-testid="delete"
          onClick={deleteTab}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

export default PasswordItem
