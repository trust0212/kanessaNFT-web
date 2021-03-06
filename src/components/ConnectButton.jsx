import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useEtherBalance, useEthers } from '@usedapp/core';
import { ethers } from 'ethers';
import useOnboard from '../hook/useOnboard';
import { displayAddress } from '../utils/helpers';
import ethIcon from '../assets/eth.png';
import { toast } from 'react-toastify';
import {getWhiteListInfo} from '../utils/whitelist';

const ConnectButton = () => {
    const { account, deactivate, activate, activateBrowserWallet } = useEthers();

    const onboardSubscriber = {
        wallet: async (wallet) => {
            console.log('wallet: ', wallet)
            await onboard.walletCheck();
            if (wallet && wallet.provider) {
                await activate(wallet.provider);
            }
        }
    }

    useEffect(() => {
        const getWhitelist = async () => {
            if (account) {
                const data = await getWhiteListInfo(account);
                if (data.verified) {
                    toast.info("You are Whitelist member.");
                }
            }
        }
        getWhitelist();
    }, [account]);

    const onboard = useOnboard(onboardSubscriber);

    const connectWallet = async () => {
        await onboard.walletSelect();
    }

        return (
            <>
                {!account && <Button onClick={(e) => {e.stopPropagation(); connectWallet()}}>Connect</Button>}
                {account && <Button onClick={(e) => {e.stopPropagation(); deactivate()}} >{displayAddress(account)}</Button>}
            </>
        )
    }

const Button = styled.button`
    width: 140px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    padding: 20px;
    // color: #131218;
    color: #323011;
    font-size: 18px;
    font-family: 'Nunito';
    position: relative;
    border: 1px solid #dfb77a;
    border-radius: 16px;
    background-clip: padding-box;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s;
    @media(max-width: 567px) {
        flex: 1;
    }
    @media(max-width: 991px) {
        width: fit-content;
        font-size: 16px;
        border-radius: 12px;
    }
    &: hover {
        background: #9f783e55;
    }
    &:after {
        position: absolute;
        top: -2px; bottom: -2px;
        left: -2px; right: -2px;
        background: linear-gradient(#dfb77a, #d3922e);
        content: '';
        z-index: -1;
        border-radius: 16px;
        @media(max-width: 991px) {
            border-radius: 12px;
        }
    }
`
const AccountView = styled.div`
    width: fit-content;
    display: flex;
    color: #131218;
    gap: 5px;
    border-radius: 12px;
    background: transparent;
    padding: 8px 15px;
    cursor: pointer;
    border-color: #131218;
    border: 1px solid ;
    &: hover {
    }
    img {
        width: 32px;
        padding: 5px;
        background: #d5a356;
        border-radius: 8px;
    }
    div {
        display: block;
    }
    span {
        display: block;
    }
    .account {
        font-size: 11px;
        color: #131218b0;
    }
    .balance {
        font-size: 13px;
    }

`;
    export default ConnectButton;