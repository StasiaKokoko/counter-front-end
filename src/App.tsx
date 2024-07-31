import "./App.css";
import { TonConnectButton } from "@tonconnect/ui-react";
import { useMainContract } from "./hooks/useMainContract";
import { useTonConnect } from "./hooks/useTonConnect";
import { fromNano } from "@ton/core";

function App() {
  const {
    sendIncrement,
    sendDeposit,
    sendWithdrawalRequest,
    contract_address,
    counter_value,
    recent_sender,
    owner_address,
    contract_balance
  } = useMainContract();

  const { connected } = useTonConnect()

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

      </div>
    </div>
  );
}

export default App;