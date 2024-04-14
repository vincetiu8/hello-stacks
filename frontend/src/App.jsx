import { useState, useEffect } from "react";
import {
  AppConfig,
  UserSession,
  showConnect,
  openContractCall,
} from "@stacks/connect";
import { StacksMocknet } from "@stacks/network";
import { stringUtf8CV } from "@stacks/transactions";

function App() {
  // State variable for the message to be submitted
  const [message, setMessage] = useState("");

  // State variable for the transaction id to be retrieved
  const [transactionId, setTransactionId] = useState("");

  // State variable for the current message to be displayed
  const [currentMessage, setCurrentMessage] = useState("");
  const [userData, setUserData] = useState(undefined);

  const appConfig = new AppConfig(["store_write"]);
  const userSession = new UserSession({ appConfig });

  const appDetails = {
    name: "Hello Stacks",
    icon: "https://freesvg.org/img/1541103084.png",
  };

  // Connects to the Stacks (Leather) wallet
  const connectWallet = () => {
    showConnect({
      appDetails,
      onFinish: () => window.location.reload(),
      userSession,
    });
  };

  // Retrieves the user data when the user logs into the page
  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        setUserData(userData);
      });
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData());
    }
  }, []);

  // Changes the message based on user input
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Submits the message to the contract
  const submitMessage = async (e) => {
    e.preventDefault();
  
    const network = new StacksMocknet();
  
    const options = {
      contractAddress: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
      contractName: "hello-stacks",
      functionName: "write-message",
      functionArgs: [stringUtf8CV(message)],
      network,
      appDetails,
      onFinish: ({ txId }) => console.log(txId),
    };
  
    await openContractCall(options);
  };

  const handleTransactionChange = (e) => {
    setTransactionId(e.target.value);
  };

  // Retrieves the most recently published message from the chain
  const retrieveMessage = async () => {
    const retrievedMessage = await fetch(
      "http://localhost:3999/extended/v1/tx/events?" +
        new URLSearchParams({
          tx_id: transactionId,
        })
    );
    const responseJson = await retrievedMessage.json();
    setCurrentMessage(responseJson.events[0].contract_log.value.repr);
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen gap-8">
      {
        !userData && (
          <button
            className="p-4 bg-indigo-500 rounded text-white"
            onClick={connectWallet}
          >
            Connect Wallet
          </button>
        )
      }
      <h1 className="text-6xl font-black">Hello Stacks</h1>
      {
        userData && (
          <div className="flex gap-4">
            <input
              className="p-4 border border-indigo-500 rounded"
              placeholder="Write message here..."
              onChange={handleMessageChange}
              value={message}
            />
            <button
              className="p-4 bg-indigo-500 rounded text-white"
              onClick={submitMessage}
            >
              Submit New Message
            </button>
          </div>
        )
      }
      <div className="flex gap-4">
        <input
          className="p-4 border border-indigo-500 rounded"
          placeholder="Paste transaction ID to look up message"
          onChange={handleTransactionChange}
          value={transactionId}
        />
        <button
          className="p-4 bg-indigo-500 rounded text-white"
          onClick={retrieveMessage}
        >
          Retrieve Message
        </button>
      </div>
      {currentMessage.length > 0 ? (
        <p className="text-2xl">{currentMessage}</p>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
