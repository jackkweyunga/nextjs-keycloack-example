"use client"

import React from 'react';
import {signIn, signOut} from "next-auth/react";

function SignOutButton() {
    return (
        <button onClick={() => signOut()}>
            Sign Out
        </button>
    );
}

export default SignOutButton;