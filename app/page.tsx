import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import SignInButton from "@/app/components/SignInButton";
import SignOutButton from "@/app/components/SignOutButton";
import {json} from "stream/consumers";

export default async function Home() {

    const session = await getServerSession(authOptions);

    const backend = process.env.BACKEND_URL

    async function makeQuery(path: string) {
        try {

            if (backend !== undefined) {

                const resp = await fetch(backend + path)
                const json = await resp.json()
                JSON.stringify(json)

                console.log(json)
                return json
            }

            return {}

        } catch (e) {
            console.log("Failed: ", e)
            return {}
        }
    }

    async function makePrivateQuery(path: string) {
        const hds = {
            Credentials: 'same-origin',
            Accept: 'application/json',
            Authorization: `Bearer ${session?.accessToken}`
        }
        console.log(hds)
        try {
            const resp = await fetch(backend + path, {
                headers: hds
            })
            const json = await resp.json()
            JSON.stringify(json)
            return json
        } catch (e) {
            console.log("Failed: ", e)
            return {}
        }
    }

    return (
        <div className="flex min-h-screen p-24 space-y-6 flex-col items-center">
            {session?.user ?
                <div className={"space-y-4"}>
                    <p>Logged in</p>
                    <SignOutButton/>
                </div> :
                <div>
                    <p>
                        You are not logged in
                    </p>

                    <div className={"text-blue-500 flex flex-col space-y-4 mt-10"}>

                        <Link href={"/protected"}>
                            Visit Protected Route
                        </Link>

                        <SignInButton/>

                    </div>
                </div>
            }
            <div className={"flex flex-col space-y-4 w-96 mx-auto p-4 overflow-auto h-fit"}>
                <p>Session</p>
                <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>

            <div className={"flex flex-col space-y-4 w-96 mx-auto p-4 overflow-auto h-fit"}>
                <p>/api/v1/service1/</p>
                <pre>{JSON.stringify(await makeQuery("/api/v1/service1"), null, 2)}</pre>
            </div>

            <div className={"flex flex-col space-y-4 w-96 mx-auto p-4 overflow-auto h-fit"}>
                <p>/api/v1/service1/protected</p>
                <pre>{JSON.stringify(await makePrivateQuery("/api/v1/service1/protected"), null, 2)}</pre>
            </div>

        </div>
    )
}
