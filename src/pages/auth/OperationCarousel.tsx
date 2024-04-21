const OperationCarousel = ({ img, title, desc }: any) => {
  return (
    <div className='!flex flex-col items-center justify-center h-full mb-10 '>
      <img src={img} alt='' className='w-[600px] h-[600px]' />
      <br />
      <h1 className='text-4xl text-white text-center font-bold'>{title}</h1>
      <p className='mt-5 text-2xl text-white text-center'>{desc}</p>
    </div>
  );
};

export default OperationCarousel;
