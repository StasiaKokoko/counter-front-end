import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import { fromNano } from "@ton/core";
import WebApp from "@twa-dev/sdk";


function App() {
  const {
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequest,
    contract_address,
    counter_value,
    contract_balance
  } = useMainContract();

  const { connected } = useTonConnect()

 // Используем WebApp для получения данных пользователя
 const initData = WebApp.initDataUnsafe;
 const userData = initData ? initData.user : null;

  return (
    <div>
      <div>
        <TonConnectButton />
      </div>
      <div>
        <div className='Card'>
          <b>Our contract Address</b>
          <div className='Hint'>{contract_address?.slice(0, 30) + "..."}</div>
          <b>Our contract Balance</b>
          {contract_balance && <div className='Hint'>{fromNano(contract_balance)}</div>}
        </div>

        <div className='Card'>
          <b>Counter Value</b>
          <div>{counter_value ?? "Loading..."}</div>
        </div>

        {/* Отображаем информацию о пользователе, если она доступна */}
        {userData ? (
          <div className='Card'>
            <b>User Info</b>
            <div className='Hint'>
              <p>User ID: {userData.id}</p>
              <p>Username: {userData.username}</p>
              <p>First Name: {userData.first_name}</p>
              <p>Last Name: {userData.last_name}</p>
              <p>Language Code: {userData.language_code}</p>
              <p>Is Bot: {userData.is_bot ? "Yes" : "No"}</p>
              <p>Is Premium: {userData.is_premium ? "Yes" : "No"}</p>
            </div>
          </div>
        ) : (
          <div className='Card'>
            <b>User Info</b>
            <div className='Hint'>User data not available</div>
          </div>
        )}

        {connected && (
              <a
                onClick={() => {
                  sendIncrement();
                }}
              >
                Increment
              </a>
            )}
        <br></br>

        {connected && (
              <a
                onClick={() => {
                  sendDeposit();
                }}
              >
                Request Deposit of 1 TON
              </a>
            )}

        <br></br>

        {connected && (
              <a
                onClick={() => {
                  sendWithdrawalRequest();
                }}
              >
                Get 0.7 TON withdrawal
              </a>
            )}

        <br></br>


      </div>
    </div>
  );
}

export default App;