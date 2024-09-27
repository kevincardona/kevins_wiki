import Icons from "@/constants/icons";
import Images from "@/constants/images";

export default function Profile() {
    return (
        <div className="font-lato bg-profile-bg text-gray-400 text-sm h-full pt-1">
            <div className="flex justify-end m-2">
                <a
                    href="https://github.com/kevincardona"
                    className="w-10 h-10 relative flex items-center"
                >
                    <img
                        src={Icons.GITHUB}
                        alt="GitHub"
                        className="w-10 rounded bg-gray-400 hover:filter hover:brightness-80 hover:grayscale"
                    />
                </a>
            </div>

            <div className="top-36 w-full text-center">
                <img src={Images.ME} alt="Profile" className="w-40 h-40 rounded-full mx-auto" />

                <b className="text-lg">Hi my name is</b>
                <h1 className="text-3xl font-montserrat text-gray-300 tracking-tight shadow-sm my-0">
                    Kevin Cardona.
                </h1>
                <div className="text-base mt-4 overflow-y-scroll">
                    I am a Full-Stack Web developer at
                    <a
                        className="text-gray-300 hover:underline"
                        href="https://www.vailsys.com/"
                    >
                        &nbsp;Vail Systems.
                    </a>
                    <br />
                    Check out some of my
                    <a
                        className="text-gray-300 hover:underline"
                        href="https://github.com/kevincardona"
                    >
                        &nbsp;Projects!
                    </a>
                </div>
            </div>
        </div>
    );

}
