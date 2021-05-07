import "./ProviderCard.css";
import axios from "axios";

import React, { useState, useEffect } from "react";

// try {
//   const baseUrl = "http://localhost:5001/bank/users/";
//       axios.get(baseUrl).then(function (response) {
//         console.log(response);
//         setAccounts(response.data);
//         console.log(accounts);
//       });
//     } catch (err) {
//       console.log(err);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

const ProviderCard = () => {
  const [providers, setProviders] = useState([]);
  //   const url = "http://localhost:8000/providers";
  const url = "/providers";

  useEffect(() => {
    // effect
    axios.get(url).then(function (response) {
      console.log(response);
      setProviders(response.data);
      console.log(providers);
    });
    return () => {
      // cleanup
    };
  }, []);

  const renderListItem = (provider) => {
    console.log("card of provider: ", provider);
    return (
      <div className="item-container">
        <p>{provider.details.first_name}</p>
        <img
          className="provider-image"
          src={provider.images[0].imageUrl}
          alt={provider.details.first_name}
        />
      </div>
    );
  };

  return <div>{providers.map((provider) => renderListItem(provider))}</div>;
};

export default ProviderCard;
