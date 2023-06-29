import React, { useEffect, useState } from 'react';
// reactstrap components
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import './index.scss';

function HomePage() {
  const [isConnected, setIsConnected] = useState(false);
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    // Check if Metamask is installed
    if (typeof window.ethereum === 'undefined') {
      alert('No Metamask!');
    } else {
      setWeb3(window.ethereum);
    }
  }, []);

  const connectWallet = async () => {
    try {
      // Request access to the user's Metamask wallet
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length > 0) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    } catch (error) {
      setIsConnected(false);
      console.error('Failed to connect to wallet:', error);
    }
  };

  const signText = async () => {
    try {
      const accounts = await web3.request({ method: 'eth_accounts' });
      const textToSign = 'Hello, Chainfuse!';
      const signature = await web3.request({
        method: 'personal_sign',
        params: [textToSign, accounts[0]]
      });
      console.log('Transaction:', signature);
    } catch (error) {
      console.error('Failed to sign text:', error);
    }
  };

  return (
    <Row className="padding-32">
      <Col xs="4" className="">
        <img src={require('assets/img/logo.png')} alt="Logo" />
      </Col>
      <Col xs="4" className="logo">
        <Link to="/" className="margin-12">
          HOME
        </Link>
        <span>/</span>
        <Link to="/about" className="margin-12">
          ABOUT
        </Link>
        <span>/</span>
        <Link to="/loginpage" className="margin-12">
          LOGIN
        </Link>
      </Col>
      <Col xs="4" className="logo">
        <a className="margin-12" onClick={connectWallet}>
          {isConnected ? 'Connected' : 'Connect Wallet'}
        </a>
        {isConnected && (
          <a className="margin-12" onClick={signText}>
            Sign Text
          </a>
        )}
      </Col>
    </Row>
  );
}

export default HomePage;
