import { useState } from "react";
import FadeIn from "react-fade-in";
import Loading from "../../components/Loading/Loading";
import ButtonBack from "../../components/ButtonBack/ButtonBack";
import MainHeading from "../../components/MainHeading/MainHeading";
import ImageWithUpload from "../../components/ImageWithUpload/ImageWithUpload";
import utils from "../../utils";
import "./ItemNew.scss";

function ItemNew({history, setRequireUpdate})
{
  const [loading, setLoading] = useState(true);

  return loading ? <Loading /> :
    <FadeIn>
      <header className="ItemNew__header">
        <ButtonBack />
        <MainHeading text={"Add a new gift"} />
      </header>
      <main className="ItemNew__main">
        <ImageWithUpload itemId={"10"} initialImage={""} setRequireUpdate={setRequireUpdate} />
      </main>
    </FadeIn>
}

export default ItemNew;