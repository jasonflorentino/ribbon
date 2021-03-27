import "./HeadingHero.scss";

function HeadingHero({text, className})
{
  return (
    <h1 className={`HeadingHero ${className}`}>
      {text}
    </h1>
  )
}

export default HeadingHero;