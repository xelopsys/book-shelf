import Image from 'next/image';

export default function Banner({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <div className='w-full min-w-[200px] h-max flex flex-col justify-start items-start gap-3'>
      <h1 className='text-base font-semibold'>{title}</h1>
      <p className='text-2xl font-bold w-full break-words'>{description}</p>
      <Image
        src={image}
        alt={title}
        width={200}
        height={200}
        quality={100}
        loading='lazy'
        className='w-full h-full rounded-lg'
      />
    </div>
  );
}
