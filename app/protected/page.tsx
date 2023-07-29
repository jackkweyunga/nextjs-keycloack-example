import React from 'react';
import Link from "next/link";

function Page() {
    return (
        <div className={"space-y-4"}>
            <Link href={"/"}>
                Home
            </Link>
            <p>This page is protected</p>
        </div>
    );
}

export default Page;