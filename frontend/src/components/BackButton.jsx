import { Link } from "react-router-dom"


const BackButton = ({destination = '/'}) => {
  return (
    <div>
      <Link to={destination}>
           <p className="underline text-sky-500">Go Back</p>
      </Link>
    </div>
  )
}

export default BackButton
