import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import get from "lodash.get";

const signUp = async (emailId) => {
  const checkUser = {
    campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
    data: { email: emailId }
  };
  const bodyObject = {
    campaignUuid: "46aa3270-d2ee-11ea-a9f0-e9a68ccff42a",
    data: {
      firstName: "firstName",
      lastName: "lastName",
      email: emailId,
      password: "password"
    }
  };
  const response = await axios.post(
    "https://api.raisely.com/v3/check-user",
    checkUser
  ).catch(err => {
    alert(get(err, "response.data.errors.0.code"));
  });

  if (get(response, "data.data.status") === "OK") {
    axios.post("https://api.raisely.com/v3/signup", bodyObject).then((res) => {
      alert(get(res, "data.message"));
    })
      .catch(err => {
        alert(get(err, "response.data.errors.0.code"));
      })
  } else if(get(response, "data.data.status") === "EXISTS") {
    alert(get(response, "data.data.status"));
  }
};

const App = () => {
  const [email, setEmail] = useState('');
  const donations = [
    { amount: 100 },
    { amount: 200 },
    { amount: 300 }
  ];

  const doubledDonations = donations.forEach(donation => ({
    ...donation,
    amount: donation.amount * 2
  }));
  console.log(doubledDonations);
  return (
    <div className="App pt-5">
      <input type="email" placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
      <button className="btn" type="button" onClick={() => signUp(email)}>
        SignUp
      </button>
    </div>
  );
};

export default App;
