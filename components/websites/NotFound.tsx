import Images from "@/constants/images";

export default function NotFound() {
    return (
        <div className="w-full h-full">
            <div className="flex flex-col items-center justify-center h-full">
                <img src={Images.UHOH} alt="404" className="w-20 h-20 animate-spin" />
                <p className="text-4xl font-bold">UH-OH</p>
                <h5>404</h5>
            </div>
        </div>
    );
}
