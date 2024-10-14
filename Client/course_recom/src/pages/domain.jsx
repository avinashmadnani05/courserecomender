// adding animation from lottie
import Lottie from "lottie-react";
import Animation from "../styles/Animation - 1728213538584.json";

const Domain = () => {
    return (
        <div>
            <Lottie animationData={Animation} loop={true} />
        </div>
    );
};
 
export default Domain;
