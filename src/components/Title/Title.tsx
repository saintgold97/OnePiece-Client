import "./Title.css"

interface TitleProps {
  className?: string;
  title?:string
}

export const Title: React.FC<TitleProps> = ({className,title}) => {
  return (
    <div className={`title ${className}`}>
        <div className="inner">
          <h1>{title}</h1>
        </div>
      </div>
  )
}
