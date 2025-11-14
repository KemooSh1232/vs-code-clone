interface IProps {
  src: string
  className?: string
}


const IconImg = ({src, className = "w-5 h-5 mr-1"} : IProps) => {
  return ( <div><img src={ src } alt="Icon" className={className} /></div>);
};

export default IconImg